"use strict";

const app = document.getElementById("app");
const KEY = "eea-practice-v2";

let category = "";
let activeLevel = 0;
let activeTopic = 0;
let currentQuestions = [];
let saved = {};
let storageOK = true;

/* Recuperar avance local sin impedir el uso si el navegador lo bloquea. */
try {
  saved = JSON.parse(localStorage.getItem(KEY) || "{}");
} catch {
  storageOK = false;
}

if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
  saved = {};
}

/* Evitar que el contenido se interprete como código HTML. */
const esc = value =>
  String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));

const statusKey = (level, topic) =>
  `${category}-${level}-${topic}`;

function go(html) {
  app.innerHTML = html;
  app.focus();
  window.scrollTo(0, 0);
}

function shuffle(items) {
  const output = [...items];

  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }

  return output;
}

/* PANTALLA DE ENTRADA */
function home() {
  go(`
    <p class="tag">EEA · Apoyo para tus clases</p>

    <h1>Aprende. Practica.<br>Vuelve a intentarlo.</h1>

    <p>
      Explora los 12 niveles y elige qué necesitas reforzar.
      No hay temas bloqueados.
    </p>

    <div class="notice">
      Beta abierta: la categoría organiza el contenido,
      pero no es un acceso privado.
      El avance se guarda en este navegador,
      sin identificar estudiantes.
    </div>

    <div class="grid">
      ${["Adolescentes", "Adultos"].map(item => `
        <section class="card">
          <h2>${item}</h2>
          <p>
            Programa de 12 niveles, con explicaciones,
            pronunciación escrita, lecturas y ejercicios.
          </p>
          <button data-category="${item}">Explorar</button>
        </section>
      `).join("")}
    </div>
  `);
}

/* SELECTOR DE NIVELES */
function levels() {
  const cards = EEA.map((level, index) => {
    let count = 0;

    for (let topic = 0; topic < 8; topic++) {
      if (saved[statusKey(index, topic)]) count++;
    }

    return `
      <section class="card">
        <p class="tag">Nivel ${index + 1}</p>
        <h2>${esc(level.title)}</h2>
        <p>${count} de 8 secciones practicadas</p>
        <button data-level="${index}">Ver temas</button>
      </section>
    `;
  }).join("");

  go(`
    <button class="secondary" data-action="home">
      ← Categorías
    </button>

    <p class="tag">${esc(category)}</p>
    <h1>Elige tu nivel</h1>

    <p>
      Los resultados son de práctica;
      no cambian tu nivel académico
      ni certifican un nivel CEFR.
    </p>

    <div class="grid">${cards}</div>
  `);
}

function topicTitle(index) {
  if (index < 6) {
    return EEA[activeLevel].topics[index][0];
  }

  return index === 6
    ? "Repaso integrado"
    : "Preparación para la evaluación";
}

/* SELECTOR DE LOS OCHO SÁBADOS */
function topics() {
  const cards = Array.from({ length: 8 }, (_, index) => {
    const record = saved[statusKey(activeLevel, index)];

    const description = index < 6
      ? "Comprende · Ejemplos · Pronunciación · Lectura · Práctica"
      : index === 6
        ? "Integra los seis temas y detecta qué necesitas reforzar."
        : "Ensaya las habilidades del nivel. No contiene el examen oficial.";

    return `
      <section class="card">
        <p class="tag">Sábado ${index + 1}</p>
        <h2>${esc(topicTitle(index))}</h2>
        <p>${description}</p>

        ${record ? `
          <p class="done">
            Practicado · Mejor resultado:
            ${Number(record.best) || 0}%
          </p>
        ` : ""}

        <button data-topic="${index}">
          ${record ? "Practicar otra vez" : "Abrir"}
        </button>
      </section>
    `;
  }).join("");

  go(`
    <button class="secondary" data-action="levels">
      ← Niveles
    </button>

    <p class="tag">
      ${esc(category)} · Nivel ${activeLevel + 1}
    </p>

    <h1>${esc(EEA[activeLevel].title)}</h1>

    <div class="grid">${cards}</div>
  `);
}

/* DOS PREGUNTAS POR TEMA: USO + COMPRENSIÓN */
function makeQuestions(rows) {
  return rows.flatMap(row => [
    {
      kind: "Gramática y uso",
      text: row[7],
      correct: row[8],
      wrong: row[9],
      why: `${row[1]} Ejemplo: ${row[2]}`
    },
    {
      kind: "Comprensión lectora",
      text: row[4],
      correct: row[5],
      wrong: row[6],
      why: `La respuesta se encuentra en esta lectura: ${row[3]}`
    }
  ]);
}

/* MOSTRAR UNA LECCIÓN, REPASO O PREPARACIÓN */
function lesson() {
  const level = EEA[activeLevel];
  const integrated = activeTopic >= 6;

  const rows = integrated
    ? level.topics
    : [level.topics[activeTopic]];

  currentQuestions = makeQuestions(rows);

  /*
    El repaso reutiliza las preguntas de los seis temas.
    La preparación mezcla su orden.
    Ninguna sección contiene el examen oficial.
  */
  if (activeTopic === 7) {
    currentQuestions = shuffle(currentQuestions);
  }

  const understands = rows.map(row => {
    const points = row[1]
      .split(/\.\s+/)
      .filter(Boolean)
      .map(point => `<li>${esc(point)}</li>`)
      .join("");

    return `
      <div class="rule">
        <h3>
          ${integrated ? esc(row[0]) : "La idea principal"}
        </h3>
        <ul>${points}</ul>
      </div>
    `;
  }).join("");

  const examples = rows.map(row => `
    <div class="example">
      <strong>${esc(row[0])}</strong>
      <p lang="en">${esc(row[2])}</p>
    </div>
  `).join("");

  const readings = rows.map((row, index) => `
    <article class="reading">
      <h3>Lectura ${index + 1} · ${esc(row[0])}</h3>

      <p lang="en">${esc(row[3])}</p>

      <p class="muted">
        Al leer, identifica personas, acciones,
        momentos y razones.
        Busca evidencia para responder;
        no necesitas traducir cada palabra.
      </p>
    </article>
  `).join("");

  const pronunciation = level.sounds.map(word => `
    <tr>
      ${word.map((part, index) => `
        <td${index === 0 ? ' lang="en"' : ""}>
          ${esc(part)}
        </td>
      `).join("")}
    </tr>
  `).join("");

  const questions = currentQuestions.map((question, index) => {
    const options = shuffle([
      question.correct,
      question.wrong
    ]);

    return `
      <fieldset>
        <legend>
          ${index + 1}.
          ${esc(question.kind)} · ${esc(question.text)}
        </legend>

        ${options.map(option => `
          <label class="option">
            <input
              type="radio"
              name="q${index}"
              value="${esc(option)}"
              required
            >
            <span>${esc(option)}</span>
          </label>
        `).join("")}

        <div id="feedback-${index}"></div>
      </fieldset>
    `;
  }).join("");

  const mission = integrated
    ? "Integra lo aprendido. Puedes consultar cualquier tema y volver a intentarlo."
    : rows[0][10];

  go(`
    <button class="secondary" data-action="topics">
      ← Temas
    </button>

    <p class="tag">
      ${esc(category)} · Nivel ${activeLevel + 1}
      · Sábado ${activeTopic + 1}
    </p>

    <h1>${esc(topicTitle(activeTopic))}</h1>

    <div class="notice">
      ${esc(mission)}

      ${activeTopic === 3 ? `
        <br>
        Este sábado incluye el control escrito y oral en clase;
        esta práctica no lo sustituye.
      ` : ""}

      ${activeTopic === 7 ? `
        <br>
        Preparación únicamente:
        la evaluación oficial escrita y oral
        corresponde al docente.
      ` : ""}
    </div>

    <section class="card">
      <h2>1. Comprende</h2>
      <div class="rules">${understands}</div>
    </section>

    <section class="card">
      <h2>2. Observa los ejemplos</h2>
      ${examples}
    </section>

    <section class="card">
      <h2>3. Pronunciación del nivel</h2>

      <p>
        Referencia estadounidense.
        Las MAYÚSCULAS indican la parte fuerte
        de la aproximación.
        La escritura española es una ayuda limitada;
        no reemplaza escuchar
        ni permite evaluar pronunciación.
      </p>

      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Palabra</th>
              <th>Fonética</th>
              <th>Aproximación</th>
              <th>Cómo practicar</th>
            </tr>
          </thead>
          <tbody>${pronunciation}</tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h2>4. Comprensión lectora</h2>

      ${readings}

      <label for="reflection">
        Escribe la idea principal y dos detalles de
        ${integrated ? "una de las lecturas" : "la lectura"}:
      </label>

      <textarea
        id="reflection"
        rows="4"
        placeholder="Esta respuesta es para tu práctica personal; no se califica ni se guarda."
      ></textarea>
    </section>

    <section class="card">
      <h2>5. Practica y comprueba</h2>

      <p>
        Contesta todas las preguntas.
        Puedes volver a consultar las lecturas.
      </p>

      <form id="quiz">
        ${questions}
        <button type="submit">Revisar respuestas</button>
      </form>

      <p
        id="result"
        role="status"
        aria-live="polite"
      ></p>
    </section>

    <section class="card">
      <h2>6. Ahora úsalo</h2>

      <ul>
        ${rows.map(row => `<li>${esc(row[10])}</li>`).join("")}
      </ul>

      <p>
        Practica en voz alta o con un compañero.
        Esta beta no graba ni califica
        el desempeño oral.
      </p>
    </section>

    <div class="actions">
      <button class="secondary" data-action="retry">
        Reiniciar intento
      </button>

      <button data-action="topics">
        Volver a los temas
      </button>
    </div>
  `);
}

/* NAVEGACIÓN */
app.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.category) {
    category = button.dataset.category;
    levels();
    return;
  }

  if (button.dataset.level !== undefined) {
    activeLevel = Number(button.dataset.level);
    topics();
    return;
  }

  if (button.dataset.topic !== undefined) {
    activeTopic = Number(button.dataset.topic);
    lesson();
    return;
  }

  switch (button.dataset.action) {
    case "home":
      home();
      break;

    case "levels":
      levels();
      break;

    case "topics":
      topics();
      break;

    case "retry":
      lesson();
      break;
  }
});

/* CORRECCIÓN Y GUARDADO DEL RESULTADO */
app.addEventListener("submit", event => {
  if (event.target.id !== "quiz") return;

  event.preventDefault();

  const answers = new FormData(event.target);
  let score = 0;

  currentQuestions.forEach((question, index) => {
    const correct =
      answers.get(`q${index}`) === question.correct;

    if (correct) score++;

    const box = document.getElementById(`feedback-${index}`);

    box.className =
      `feedback ${correct ? "" : "incorrect"}`;

    box.textContent =
      `${correct ? "Correcto." : "Revisa esta respuesta."} ` +
      `Respuesta: ${question.correct}. ${question.why}`;
  });

  const percent = Math.round(
    score / currentQuestions.length * 100
  );

  const key = statusKey(activeLevel, activeTopic);

  const previous =
    saved[key] && typeof saved[key] === "object"
      ? saved[key]
      : {};

  saved[key] = {
    best: Math.max(Number(previous.best) || 0, percent),
    last: percent,
    attempts: (Number(previous.attempts) || 0) + 1
  };

  try {
    localStorage.setItem(KEY, JSON.stringify(saved));
    storageOK = true;
  } catch {
    storageOK = false;
  }

  const result = document.getElementById("result");

  result.textContent =
    `Resultado: ${score}/${currentQuestions.length} (${percent}%). ` +
    "No es una nota oficial ni una evaluación oral. " +
    (storageOK
      ? "Avance guardado en este navegador."
      : "No se pudo guardar de forma persistente; el avance solo durará esta sesión.");

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

home();
