"use strict";

/* CONFIGURACIÓN DE LA PLATAFORMA */
window.EEA_CONFIG = Object.freeze({
  supabaseUrl:
    "https://wunevzubuhjkkcqslwzu.supabase.co",

  supabaseKey:
    "sb_publishable_PAaowBw_ew28zcz47lfBjg_BnBYqTuG",

  studentEmailDomain:
    "students.eea.invalid",

  platformPage:
    "index.html",

  loginPage:
    "login.html"
});

/* AUTENTICACIÓN */
window.EEA_AUTH = (() => {
  let client = null;

  function getClient() {
    const config = window.EEA_CONFIG;

    if (!config) {
      throw new Error("CONFIG");
    }

    const validUrl =
      /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(
        config.supabaseUrl
      );

    if (
      !validUrl ||
      typeof config.supabaseKey !== "string" ||
      !config.supabaseKey.trim() ||
      config.supabaseKey.includes("PEGA_AQUI") ||
      config.supabaseKey.startsWith("sb_secret_")
    ) {
      throw new Error("CONFIG");
    }

    /*
      Si se utiliza una antigua clave JWT,
      aceptar únicamente una clave con rol anon.
    */
    if (config.supabaseKey.startsWith("eyJ")) {
      try {
        const parts = config.supabaseKey.split(".");

        if (parts.length !== 3) {
          throw new Error("CONFIG");
        }

        let payloadBase64 = parts[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        payloadBase64 = payloadBase64.padEnd(
          Math.ceil(payloadBase64.length / 4) * 4,
          "="
        );

        const payload = JSON.parse(
          atob(payloadBase64)
        );

        if (payload.role !== "anon") {
          throw new Error("CONFIG");
        }
      } catch {
        throw new Error("CONFIG");
      }
    }

    if (
      !window.supabase ||
      typeof window.supabase.createClient !== "function"
    ) {
      throw new Error("SDK");
    }

    if (!client) {
      client = window.supabase.createClient(
        config.supabaseUrl,
        config.supabaseKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false
          }
        }
      );
    }

    return client;
  }

  /* VALIDAR CÓDIGOS DE ESTUDIANTES */
  function normalizeId(value) {
    const id = String(value ?? "")
      .trim()
      .toUpperCase();

    /*
      Formatos admitidos:
      EEA-EFK-004
      EEA-EFT-001
      EEA-EFA-013

      Permite más de tres dígitos para crecimiento futuro.
    */
    if (!/^EEA-(EFK|EFT|EFA)-\d{3,}$/.test(id)) {
      throw new Error("ID");
    }

    return id;
  }

  /* ACEPTAR CORREO O STUDENT ID */
  function emailForId(value) {
    const input = String(value ?? "").trim();

    if (!input) {
      throw new Error("ID");
    }

    /*
      Si se ingresa un correo,
      utilizarlo directamente para autenticar.
    */
    if (input.includes("@")) {
      const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

      if (!validEmail) {
        throw new Error("ID");
      }

      return input.toLowerCase();
    }

    /*
      Si se ingresa un Student ID,
      convertirlo al alias interno de Supabase Auth.

      EEA-EFT-001
      → eea-eft-001@students.eea.invalid
    */
    const id = normalizeId(input).toLowerCase();

    return `${id}@${window.EEA_CONFIG.studentEmailDomain}`;
  }

  return Object.freeze({
    getClient,
    normalizeId,
    emailForId
  });
})();
