"use strict";

const app = document.getElementById("app");

let category = "";
let currentLessonId = null;

/*
  Para agregar otra lección, añade un objeto a este arreglo
  siguiendo la misma estructura.
*/
const lessons = [
  {
    id: 1,
    level: 1,
    title: "Saludos y presentaciones",
    goal:
      "Puedo saludar, decir mi nombre y preguntar el nombre de otra persona.",

    explanation: [
      {
        title: "1. Saluda",
        text:
          "Hello y Hi significan hola. Good morning se usa por la mañana " +
          "y Good afternoon por la tarde. Para despedirte puedes usar Goodbye o Bye."
      },
      {
        title: "2. Preséntate con I am",
        text:
          "I am significa yo soy o yo estoy, según el contexto. " +
          "Para decir tu nombre puedes usar I am Ana o su forma corta: I’m Ana."
      },
      {
        title: "3. Pregunta el nombre",
        text:
          "What’s your name? significa ¿Cómo te llamas? " +
          "Puedes responder My name is Carlos o I’m Carlos."
      },
      {
        title: "4. Usa you are",
        text:
          "You are significa tú eres o tú estás. Su forma corta es you’re. " +
          "Ejemplo: You’re Carlos. No confundas you’re con your: " +
          "en What’s your name?, your significa tu."
      }
    ],

    examples: [
      ["Hello! I’m Ana.", "¡Hola! Soy Ana."],
      ["What’s your name?", "¿Cómo te llamas?"],
      ["My name is Carlos.", "Me llamo Carlos."],
      ["Nice to meet you.", "Mucho gusto."],
      ["Nice to meet you, too.", "Mucho gusto también."]
    ],

    pronunciation: [
      {
        word: "Hello",
        ipa: "/həˈloʊ/",
        guide: "je-LÓU",
        tip:
          "La segunda sílaba lleva la fuerza. La h es aire suave, " +
          "no una jota fuerte."
      },
      {
        word: "Hi",
        ipa: "/haɪ/",
        guide: "JÁI",
        tip:
          "Una sola sílaba. Empieza dejando salir aire suave; " +
          "la j escrita es solo una aproximación."
      },
      {
        word: "Name",
        ipa: "/neɪm/",
        guide: "NÉIM",
        tip:
          "Una sola sílaba. Desliza la vocal de e hacia i. " +
          "No agregues una vocal después de la m."
      },
      {
        word: "Meet",
        ipa: "/miːt/",
        guide: "MÍIT",
        tip:
          "Una sola sílaba, con una i sostenida. " +
          "Termina en t sin añadir una e."
      }
    ],

    questions: [
      {
        text: "Completa: I ___ Ana.",
        options: ["are", "am", "is"],
        answer: 1,
        explanation: "Con I usamos am: I am Ana."
      },
      {
        text: "¿Qué pregunta sirve para conocer el nombre?",
        options: [
          "What’s your name?",
          "Good afternoon.",
          "Nice to meet you."
        ],
        answer: 0,
        explanation:
          "What’s your name? significa ¿Cómo te llamas?"
      },
      {
        text: "Elige la forma corta de I am.",
        options: ["I’s", "I’re", "I’m"],
        answer: 2,
        explanation: "I am se contrae como I’m."
      },
      {
        text: "Responde: Nice to meet you.",
        options: [
          "My name.",
          "Nice to meet you, too.",
          "You am Carlos."
        ],
        answer: 1,
        explanation:
          "Nice to meet you, too expresa que también te da gusto conocer a la persona."
      },
      {
        text: "Completa: You ___ Carlos.",
        options: ["am", "is", "are"],
        answer: 2,
        explanation: "Con you usamos are: You are Carlos."
      }
    ],

    speakingTask:
      "Sin leer los ejemplos: saluda, di tu nombre y pregunta el nombre " +
      "de otra persona. Termina con Nice to meet you. " +
      "Puedes practicar ambas partes del diálogo si estás solo."
  }
];

/* Convierte texto en contenido seguro para las plantillas HTML. */
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function focusContent() {
  app.focus();
  window.scrollTo(0, 0);
}

function showHome() {
  currentLessonId = null;

  app.innerHTML = `
    <p class="tag">Tu espacio de apoyo</p>
    <h1>Practica a tu ritmo.</h1>
    <p>
      Repasa lo que viste en clase y prepárate para participar
      con más confianza.
    </p>

    <div class="notice">
      <strong>Primera versión de prueba.</strong>
      La categoría organiza el contenido; no funciona como
      contraseña ni restringe el acceso.
    </div>

    <div class="grid">
      <section class="card">
        <h2>Adolescentes</h2>
        <p>Explicaciones, ejemplos y práctica del programa EEA.</p>
        <button data-category="Adolescentes">Entrar</button>
      </section>

      <section class="card">
        <h2>Adultos</h2>
        <p>Refuerza tus bases y practica para tus clases.</p>
        <button data-category="Adultos">Entrar</button>
      </section>
    </div>
  `;

  focusContent();
}

function showLevels() {
  currentLessonId = null;

  app.innerHTML = `
    <button class="secondary" data-action="home">
      ← Cambiar categoría
    </button>

    <p class="tag">${escapeHTML(category)}</p>
    <h1>Elige un nivel</h1>
    <p>
      No necesitas aprobar una práctica para abrir otra.
      Esta primera entrega incluye una lección del nivel 1.
    </p>

    <section class="card">
      <p class="tag">Nivel 1</p>
      <h2>Me and My Identity</h2>
      <p>
        Aprende a presentarte e intercambiar información personal.
      </p>
      <button data-action="topics">Ver temas</button>
    </section>

    <p>
      Los niveles 2–12 se incorporarán conforme preparemos
      sus contenidos.
    </p>
  `;

  focusContent();
}

function showTopics() {
  currentLessonId = null;

  const cards = lessons.map(lesson => `
    <section class="card">
      <p class="tag">Tema ${lesson.id}</p>
      <h2>${escapeHTML(lesson.title)}</h2>
      <p>${escapeHTML(lesson.goal)}</p>
      <button data-lesson="${lesson.id}">Practicar</button>
    </section>
  `).join("");

  app.innerHTML = `
    <button class="secondary" data-action="levels">
      ← Niveles
    </button>

    <p class="tag">${escapeHTML(category)} · Nivel 1</p>
    <h1>Me and My Identity</h1>

    <div class="grid">${cards}</div>

    <div class="notice">
      Próximos temas: alfabeto e información personal,
      países y nacionalidades, personas y ocupaciones,
      descripción personal, presentación completa,
      repaso y preparación para la evaluación.
    </div>
  `;

  focusContent();
}

function showLesson(id) {
  const lesson = lessons.find(item => item.id === id);
  if (!lesson) return;

  currentLessonId = id;

  const explanations = lesson.explanation.map(item => `
    <h3>${escapeHTML(item.title)}</h3>
    <p>${escapeHTML(item.text)}</p>
  `).join("");

  const examples = lesson.examples.map(([english, spanish]) => `
    <div class="example">
      <strong lang="en">${escapeHTML(english)}</strong><br>
      ${escapeHTML(spanish)}
    </div>
  `).join("");

  const pronunciation = lesson.pronunciation.map(item => `
    <tr>
      <td lang="en"><strong>${escapeHTML(item.word)}</strong></td>
      <td>${escapeHTML(item.ipa)}</td>
      <td><strong>${escapeHTML(item.guide)}</strong></td>
      <td>${escapeHTML(item.tip)}</td>
    </tr>
  `).join("");

  const questions = lesson.questions.map((question, index) => `
    <fieldset>
      <legend>${index + 1}. ${escapeHTML(question.text)}</legend>

      ${question.options.map((option, optionIndex) => `
        <label>
          <input
            type="radio"
            name="q${index}"
            value="${optionIndex}"
            required
          >
          <span lang="en">${escapeHTML(option)}</span>
        </label>
      `).join("")}

      <div id="feedback-${index}"></div>
    </fieldset>
  `).join("");

  app.innerHTML = `
    <button class="secondary" data-action="topics">
      ← Temas del nivel
    </button>

    <p class="tag">
      ${escapeHTML(category)} · Nivel ${lesson.level}
    </p>

    <h1>${escapeHTML(lesson.title)}</h1>

    <div class="notice">
      <strong>Al terminar:</strong>
      ${escapeHTML(lesson.goal)}
    </div>

    <section class="card">
      <h2>Comprende</h2>
      ${explanations}
    </section>

    <section class="card">
      <h2>Observa los ejemplos</h2>
      ${examples}
    </section>

    <section class="card">
      <h2>Guía de pronunciación</h2>
      <p>
        Referencia: inglés estadounidense.
        Las mayúsculas marcan la parte fuerte de la aproximación.
        Las letras españolas son una ayuda inicial y no representan
        todos los sonidos con exactitud.
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
      <h2>Practica</h2>
      <p>Selecciona una respuesta en cada pregunta.</p>

      <form id="practice-form">
        ${questions}
        <button type="submit">Revisar respuestas</button>
      </form>

      <div id="result" role="status" aria-live="polite"></div>
    </section>

    <section class="card">
      <h2>Ahora úsalo</h2>
      <p>${escapeHTML(lesson.speakingTask)}</p>

      <div class="notice">
        Esta actividad se practica en voz alta.
        La beta no graba ni evalúa tu pronunciación.
      </div>
    </section>

    <div class="actions">
      <button class="secondary" data-action="retry">
        Reiniciar práctica
      </button>
      <button data-action="topics">Volver a los temas</button>
    </div>
  `;

  focusContent();
}

app.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.category) {
    category = button.dataset.category;
    showLevels();
    return;
  }

  if (button.dataset.lesson) {
    showLesson(Number(button.dataset.lesson));
    return;
  }

  switch (button.dataset.action) {
    case "home":
      showHome();
      break;
    case "levels":
      showLevels();
      break;
    case "topics":
      showTopics();
      break;
    case "retry":
      showLesson(currentLessonId);
      break;
  }
});

app.addEventListener("submit", event => {
  if (event.target.id !== "practice-form") return;
  event.preventDefault();

  const lesson = lessons.find(item => item.id === currentLessonId);
  if (!lesson) return;

  const answers = new FormData(event.target);
  let correct = 0;

  lesson.questions.forEach((question, index) => {
    const selected = answers.get(`q${index}`);
    const isCorrect =
      selected !== null && Number(selected) === question.answer;

    if (isCorrect) correct++;

    const feedback = document.getElementById(`feedback-${index}`);

    feedback.className =
      `feedback${isCorrect ? "" : " incorrect"}`;

    feedback.textContent =
      `${isCorrect ? "Correcto." : "Revisa esta respuesta."} ` +
      `Respuesta: ${question.options[question.answer]}. ` +
      question.explanation;
  });

  const result = document.getElementById("result");

  result.textContent =
    `Resultado: ${correct} de ${lesson.questions.length}. ` +
    (correct === lesson.questions.length
      ? "¡Bien! Ahora practica el diálogo sin leer."
      : "Lee las explicaciones y vuelve a intentarlo.") +
    " Este resultado es de práctica y no es una nota oficial.";

  result.scrollIntoView({ behavior: "smooth", block: "center" });
});

showHome();
