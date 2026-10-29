window.EEA_CONFIG = Object.freeze({
  supabaseUrl: "https://wunevzubuhjkkcqslwzu.supabase.co/rest/v1/",
  supabaseKey: sb_publishable_PAaowBw_ew28zcz47lfBjg_BnBYqTuG,

  // Convención interna para autenticar con Student ID.
  studentEmailDomain: "students.eea.invalid",

  // Página que se abre después de ingresar.
  platformPage: "index.html",

  loginPage: "login.html"
});

window.EEA_AUTH = (() => {
  let client;

  function getClient() {
    const config = window.EEA_CONFIG;

    const validUrl =
      /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(
        config.supabaseUrl
      );

    if (
      !validUrl ||
      !config.supabaseKey ||
      config.supabaseKey.includes("PEGA_AQUI") ||
      config.supabaseKey.startsWith("sb_secret_")
    ) {
      throw new Error("CONFIG");
    }

    // Verificar las antiguas claves anon con formato JWT.
    if (config.supabaseKey.startsWith("eyJ")) {
      try {
        const part = config.supabaseKey.split(".")[1];

        const payload = JSON.parse(
          atob(
            part
              .replace(/-/g, "+")
              .replace(/_/g, "/")
          )
        );

        if (payload.role !== "anon") {
          throw new Error("CONFIG");
        }
      } catch {
        throw new Error("CONFIG");
      }
    }

    if (!window.supabase?.createClient) {
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

  function normalizeId(value) {
    const id = String(value)
      .trim()
      .toUpperCase();

    if (!/^EEA-(EFK|EFT|EFA)-\d{3,}$/.test(id)) {
      throw new Error("ID");
    }

    return id;
  }

  function emailForId(value) {
    const id = normalizeId(value).toLowerCase();

    return `${id}@${window.EEA_CONFIG.studentEmailDomain}`;
  }

  return Object.freeze({
    getClient,
    normalizeId,
    emailForId
  });
})();
