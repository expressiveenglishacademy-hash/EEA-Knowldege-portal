"use strict";

const app = document.getElementById("app");
const access = window.EEA_ACCESS;
if (!access || !access.userId) throw new Error("Se necesita una sesión verificada.");
const KEY = `eea-practice-v3:${access.userId}`;
const PROGRAM_NAMES = Object.freeze({ EFK: "Niños", EFT: "Adolescentes", EFA: "Adultos" });
const PROGRAM_CODES = Object.freeze({ "Niños": "EFK", "Adolescentes": "EFT", "Adultos": "EFA" });

let category = "";
let activeLevel = 0;
let activeTopic = 0;
let currentQuestions = [];
let saved = {};
let storageOK = true;

/* RECUPERAR AVANCE */
try {
  saved = JSON.parse(localStorage.getItem(KEY) || "{}");
} catch {
  storageOK = false;
}

if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
  saved = {};
}

/* PROTEGER EL CONTENIDO HTML */
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

/* CONTEXTO ACADÉMICO ASIGNADO DESDE SUPABASE */
function programCode() {
  return access.isAdmin ? PROGRAM_CODES[category] : access.student.program;
}

function programLevels() {
  const code = programCode();
  if (code === "EFK") {
    const material = window.EEA_KIDS || [];
    return Array.from({ length: 12 }, (_, index) => material[index] || {
      title: `Nivel ${index + 1}`,
      topics: null
    });
  }
  if (code === "EFA") return window.EEA_ADULTS || window.EEA || [];
  if (code === "EFT") return window.EEA_TEENS || window.EEA || [];
  return [];
}

function assignedContext() {
  if (!access.isAdmin) {
    category = PROGRAM_NAMES[access.student.program];
  }
}

function availableLevel() {
  const level = programLevels()[activeLevel];
  return level && Array.isArray(level.topics) && level.topics.length === 6;
}

function pendingMaterial() {
  currentQuestions = [];
  go(`
    <button class="secondary" data-action="levels">← Mis 12 niveles</button>
    <p class="tag">${esc(category)} · Nivel ${activeLevel + 1}</p>
    <h1>Tu espacio de aprendizaje</h1>
    <div class="notice">El material de este nivel todavía no está disponible.
      Tu profesor te avisará cuando podás comenzar.</div>
  `);
}

/* PANTALLA DE ENTRADA */
function home() {
  if (!access.isAdmin) {
    assignedContext();
    levels();
    return;
  }
  category = "";
  go(`
    <p class="tag">
      Expressive English Academy · Apoyo para tus clases
    </p>

    <h1>Aprende. Practica.<br>Vuelve a intentarlo.</h1>

    <p>
      Vista de administrador: elegí el programa y nivel que querés revisar.
    </p>

    <div class="notice">
      Estás revisando el material como administrador.
      Cada estudiante tiene acceso a los 12 niveles de su programa desde el primer ingreso.
    </div>

    <div class="grid">
      ${["Niños", "Adolescentes", "Adultos"].map(item => `
        <section class="card">
          <h2>${item}</h2>

          <p>
            Programa de 12 niveles, con explicaciones,
            vocabulario por lección, pronunciación,
            lecturas y ejercicios.
          </p>

          <button data-category="${item}">
            Explorar
          </button>
        </section>
      `).join("")}
    </div>
  `);
}

/* SELECTOR DE NIVELES */
function levels() {
  assignedContext();
  if (!programLevels().length) { activeLevel = 0; pendingMaterial(); return; }
  const cards = programLevels().map((level, index) => {
    let count = 0;

    for (let topic = 0; topic < 8; topic++) {
      if (saved[statusKey(index, topic)]) count++;
    }

    return `
      <section class="card">
        <p class="tag">Nivel ${index + 1}</p>

        <h2>${esc(level.title)}</h2>

        <p>${Array.isArray(level.topics)
          ? `${count} de 8 secciones practicadas`
          : "Material en preparación"}</p>

        <button data-level="${index}">
          Ver temas
        </button>
      </section>
    `;
  }).join("");

  go(`
    ${access.isAdmin ? '<button class="secondary" data-action="home">← Programas</button>' : ""}

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
    return programLevels()[activeLevel].topics[index][0];
  }

  return index === 6
    ? "Repaso integrado"
    : "Preparación para la evaluación";
}

/* SELECTOR DE LOS OCHO SÁBADOS */
function topics() {
  assignedContext();
  if (!availableLevel()) { pendingMaterial(); return; }
  const cards = Array.from({ length: 8 }, (_, index) => {
    const record = saved[statusKey(activeLevel, index)];

    const description = index < 6
      ? "Comprende · Ejemplos · Vocabulario · Pronunciación · Lectura · Práctica"
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
    <button class="secondary" data-action="levels">← Mis 12 niveles</button>

    <p class="tag">
      ${esc(category)} · Nivel ${activeLevel + 1}
    </p>

    <h1>${esc(programLevels()[activeLevel].title)}</h1>

    <div class="grid">${cards}</div>
  `);
}

/* DOS PREGUNTAS POR TEMA */
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

/*
  VOCABULARIO POR NIVEL Y LECCIÓN

  Cada nivel contiene seis listas, una por tema.
  Cada entrada tiene:
  [palabra o expresión, fonética estadounidense, significado].

  Los sábados 7 y 8 recuperan vocabulario anterior.
*/
const EEA_LESSON_VOCAB = [

  /* NIVEL 1 */
  [
    [
      ["hello", "həˈloʊ", "hola"],
      ["goodbye", "ɡʊdˈbaɪ", "adiós"],
      ["name", "neɪm", "nombre"],
      ["please", "pliːz", "por favor"],
      ["welcome", "ˈwɛlkəm", "bienvenido/a"]
    ],
    [
      ["spell", "spɛl", "deletrear"],
      ["letter", "ˈlɛtər", "letra"],
      ["number", "ˈnʌmbər", "número"],
      ["email", "ˈiːmeɪl", "correo electrónico"],
      ["age", "eɪdʒ", "edad"]
    ],
    [
      ["country", "ˈkʌntri", "país"],
      ["nationality", "ˌnæʃəˈnæləti", "nacionalidad"],
      ["Nicaragua", "ˌnɪkəˈrɑɡwə", "Nicaragua"],
      ["American", "əˈmɛrɪkən", "estadounidense"],
      ["Canadian", "kəˈneɪdiən", "canadiense"]
    ],
    [
      ["teacher", "ˈtiːtʃər", "docente"],
      ["student", "ˈstuːdənt", "estudiante"],
      ["doctor", "ˈdɑktər", "médico/a"],
      ["nurse", "nɜrs", "enfermero/a"],
      ["driver", "ˈdraɪvər", "conductor/a"]
    ],
    [
      ["friendly", "ˈfrɛndli", "amigable"],
      ["quiet", "ˈkwaɪət", "tranquilo/a"],
      ["tall", "tɔl", "alto/a"],
      ["short", "ʃɔrt", "bajo/a; corto/a"],
      ["kind", "kaɪnd", "amable"]
    ],
    [
      ["live", "lɪv", "vivir"],
      ["work", "wɜrk", "trabajar"],
      ["study", "ˈstʌdi", "estudiar"],
      ["speak", "spiːk", "hablar"],
      ["learn", "lɜrn", "aprender"]
    ]
  ],

  /* NIVEL 2 */
  [
    [
      ["mother", "ˈmʌðər", "madre"],
      ["father", "ˈfɑðər", "padre"],
      ["sister", "ˈsɪstər", "hermana"],
      ["brother", "ˈbrʌðər", "hermano"],
      ["parents", "ˈpɛrənts", "padres"],
      ["grandmother", "ˈɡrænmʌðər", "abuela"],
      ["grandfather", "ˈɡrænfɑðər", "abuelo"],
      ["cousin", "ˈkʌzən", "primo/a"]
    ],
    [
      ["this", "ðɪs", "este/esta"],
      ["that", "ðæt", "ese/esa; aquel/aquella"],
      ["these", "ðiːz", "estos/estas"],
      ["those", "ðoʊz", "esos/esas; aquellos/aquellas"],
      ["backpack", "ˈbækpæk", "mochila"],
      ["notebook", "ˈnoʊtbʊk", "cuaderno"],
      ["phone", "foʊn", "teléfono"],
      ["keys", "kiːz", "llaves"]
    ],
    [
      ["neighborhood", "ˈneɪbərhʊd", "vecindario"],
      ["school", "skuːl", "escuela"],
      ["park", "pɑrk", "parque"],
      ["bank", "bæŋk", "banco"],
      ["pharmacy", "ˈfɑrməsi", "farmacia"],
      ["supermarket", "ˈsuːpərˌmɑrkɪt", "supermercado"],
      ["library", "ˈlaɪˌbrɛri", "biblioteca"],
      ["church", "tʃɜrtʃ", "iglesia"]
    ],
    [
      ["next to", "nɛkst tuː", "al lado de"],
      ["between", "bɪˈtwiːn", "entre"],
      ["behind", "bɪˈhaɪnd", "detrás de"],
      ["in front of", "ɪn frʌnt əv", "delante de"],
      ["across from", "əˈkrɔs frəm", "enfrente de"],
      ["near", "nɪr", "cerca de"],
      ["turn left", "tɜrn lɛft", "gira a la izquierda"],
      ["turn right", "tɜrn raɪt", "gira a la derecha"]
    ],
    [
      ["morning", "ˈmɔrnɪŋ", "mañana (parte del día)"],
      ["afternoon", "ˌæftərˈnuːn", "tarde"],
      ["evening", "ˈiːvnɪŋ", "tarde/noche"],
      ["noon", "nuːn", "mediodía"],
      ["birthday", "ˈbɜrθdeɪ", "cumpleaños"],
      ["appointment", "əˈpɔɪntmənt", "cita"],
      ["weekday", "ˈwiːkdeɪ", "día entre semana"],
      ["weekend", "ˈwiːkɛnd", "fin de semana"]
    ],
    [
      ["who", "huː", "quién"],
      ["what", "wʌt", "qué"],
      ["where", "wɛr", "dónde"],
      ["when", "wɛn", "cuándo"],
      ["how", "haʊ", "cómo"],
      ["address", "ˈædrɛs", "dirección (domicilio)"],
      ["occupation", "ˌɑkjəˈpeɪʃən", "ocupación"],
      ["surname", "ˈsɜrˌneɪm", "apellido"]
    ]
  ],

  /* NIVEL 3 */
  [
    [
      ["wake up", "weɪk ʌp", "despertarse"],
      ["get up", "ɡɛt ʌp", "levantarse"],
      ["take a shower", "teɪk ə ˈʃaʊər", "ducharse"],
      ["have breakfast", "hæv ˈbrɛkfəst", "desayunar"],
      ["go to bed", "ɡoʊ tə bɛd", "acostarse"]
    ],
    [
      ["leave", "liːv", "salir; irse"],
      ["arrive", "əˈraɪv", "llegar"],
      ["start", "stɑrt", "comenzar"],
      ["finish", "ˈfɪnɪʃ", "terminar"],
      ["return", "rɪˈtɜrn", "regresar"]
    ],
    [
      ["works", "wɜrks", "trabaja"],
      ["studies", "ˈstʌdiz", "estudia"],
      ["watches", "ˈwɑtʃɪz", "mira"],
      ["goes", "ɡoʊz", "va"],
      ["has", "hæz", "tiene"]
    ],
    [
      ["skip", "skɪp", "saltarse; omitir"],
      ["smoke", "smoʊk", "fumar"],
      ["drive", "draɪv", "conducir"],
      ["exercise", "ˈɛksərsaɪz", "hacer ejercicio"],
      ["cook", "kʊk", "cocinar"]
    ],
    [
      ["breakfast", "ˈbrɛkfəst", "desayuno"],
      ["lunch", "lʌntʃ", "almuerzo"],
      ["dinner", "ˈdɪnər", "cena"],
      ["homework", "ˈhoʊmwɜrk", "tarea escolar"],
      ["chores", "tʃɔrz", "quehaceres"]
    ],
    [
      ["always", "ˈɔlweɪz", "siempre"],
      ["usually", "ˈjuːʒuəli", "normalmente"],
      ["sometimes", "ˈsʌmtaɪmz", "a veces"],
      ["rarely", "ˈrɛrli", "rara vez"],
      ["never", "ˈnɛvər", "nunca"]
    ]
  ],

  /* NIVEL 4 */
  [
    [
      ["reading", "ˈriːdɪŋ", "lectura; leer"],
      ["swimming", "ˈswɪmɪŋ", "natación; nadar"],
      ["drawing", "ˈdrɔɪŋ", "dibujo; dibujar"],
      ["dancing", "ˈdænsɪŋ", "baile; bailar"],
      ["hiking", "ˈhaɪkɪŋ", "senderismo"]
    ],
    [
      ["like", "laɪk", "gustar"],
      ["love", "lʌv", "encantar; amar"],
      ["enjoy", "ɪnˈdʒɔɪ", "disfrutar"],
      ["hate", "heɪt", "odiar"],
      ["prefer", "prɪˈfɜr", "preferir"]
    ],
    [
      ["relaxing", "rɪˈlæksɪŋ", "relajante"],
      ["exciting", "ɪkˈsaɪtɪŋ", "emocionante"],
      ["boring", "ˈbɔrɪŋ", "aburrido/a"],
      ["interesting", "ˈɪntrəstɪŋ", "interesante"],
      ["because", "bɪˈkɔz", "porque"]
    ],
    [
      ["running", "ˈrʌnɪŋ", "corriendo"],
      ["writing", "ˈraɪtɪŋ", "escribiendo"],
      ["talking", "ˈtɔkɪŋ", "hablando"],
      ["listening", "ˈlɪsənɪŋ", "escuchando"],
      ["waiting", "ˈweɪtɪŋ", "esperando"]
    ],
    [
      ["now", "naʊ", "ahora"],
      ["today", "təˈdeɪ", "hoy"],
      ["currently", "ˈkɜrəntli", "actualmente"],
      ["every day", "ˈɛvri deɪ", "todos los días"],
      ["at the moment", "æt ðə ˈmoʊmənt", "en este momento"]
    ],
    [
      ["would you like to", "wʊd ju laɪk tə", "te gustaría"],
      ["let’s", "lɛts", "vamos a (propuesta)"],
      ["join", "dʒɔɪn", "unirse"],
      ["busy", "ˈbɪzi", "ocupado/a"],
      ["sounds good", "saʊndz ɡʊd", "suena bien"]
    ]
  ],

  /* NIVEL 5 */
  [
    [
      ["rice", "raɪs", "arroz"],
      ["bread", "brɛd", "pan"],
      ["chicken", "ˈtʃɪkən", "pollo"],
      ["egg", "ɛɡ", "huevo"],
      ["vegetables", "ˈvɛdʒtəbəlz", "verduras"]
    ],
    [
      ["some", "sʌm", "algo de; algunos/as"],
      ["any", "ˈɛni", "algo de; ninguno (según contexto)"],
      ["milk", "mɪlk", "leche"],
      ["water", "ˈwɔtər", "agua"],
      ["cheese", "tʃiːz", "queso"]
    ],
    [
      ["bottle", "ˈbɑtəl", "botella"],
      ["bag", "bæɡ", "bolsa"],
      ["pound", "paʊnd", "libra"],
      ["price", "praɪs", "precio"],
      ["change", "tʃeɪndʒ", "cambio; vuelto"]
    ],
    [
      ["menu", "ˈmɛnjuː", "menú"],
      ["order", "ˈɔrdər", "pedir; pedido"],
      ["bill", "bɪl", "cuenta"],
      ["without", "wɪˈðaʊt", "sin"],
      ["dessert", "dɪˈzɜrt", "postre"]
    ],
    [
      ["restaurant", "ˈrɛstərɑnt", "restaurante"],
      ["café", "kæˈfeɪ", "cafetería"],
      ["cinema", "ˈsɪnəmə", "cine"],
      ["beach", "biːtʃ", "playa"],
      ["mall", "mɔl", "centro comercial"]
    ],
    [
      ["how about", "haʊ əˈbaʊt", "qué tal si"],
      ["meet", "miːt", "encontrarse"],
      ["invite", "ɪnˈvaɪt", "invitar"],
      ["available", "əˈveɪləbəl", "disponible"],
      ["instead", "ɪnˈstɛd", "en su lugar"]
    ]
  ],

  /* NIVEL 6 */
  [
    [
      ["yesterday", "ˈjɛstərdeɪ", "ayer"],
      ["last night", "læst naɪt", "anoche"],
      ["tired", "ˈtaɪərd", "cansado/a"],
      ["sick", "sɪk", "enfermo/a"],
      ["happy", "ˈhæpi", "feliz"]
    ],
    [
      ["worked", "wɜrkt", "trabajó"],
      ["played", "pleɪd", "jugó"],
      ["visited", "ˈvɪzɪtɪd", "visitó"],
      ["wanted", "ˈwɑntɪd", "quiso; quería"],
      ["needed", "ˈniːdɪd", "necesitó"]
    ],
    [
      ["went", "wɛnt", "fue"],
      ["had", "hæd", "tuvo"],
      ["saw", "sɔ", "vio"],
      ["ate", "eɪt", "comió"],
      ["made", "meɪd", "hizo; fabricó"]
    ],
    [
      ["miss", "mɪs", "perder (transporte); extrañar"],
      ["forget", "fərˈɡɛt", "olvidar"],
      ["lose", "luːz", "perder"],
      ["break", "breɪk", "romper"],
      ["happen", "ˈhæpən", "suceder"]
    ],
    [
      ["where", "wɛr", "dónde"],
      ["when", "wɛn", "cuándo"],
      ["why", "waɪ", "por qué"],
      ["how long", "haʊ lɔŋ", "cuánto tiempo"],
      ["who with", "huː wɪð", "con quién"]
    ],
    [
      ["first", "fɜrst", "primero"],
      ["then", "ðɛn", "después"],
      ["after that", "ˈæftər ðæt", "después de eso"],
      ["finally", "ˈfaɪnəli", "finalmente"],
      ["suddenly", "ˈsʌdənli", "de repente"]
    ]
  ],

  /* NIVEL 7 */
  [
    [
      ["goal", "ɡoʊl", "meta"],
      ["improve", "ɪmˈpruːv", "mejorar"],
      ["save", "seɪv", "ahorrar"],
      ["graduate", "ˈɡrædʒueɪt", "graduarse"],
      ["career", "kəˈrɪr", "carrera profesional"]
    ],
    [
      ["travel", "ˈtrævəl", "viajar"],
      ["vacation", "veɪˈkeɪʃən", "vacaciones"],
      ["flight", "flaɪt", "vuelo"],
      ["suitcase", "ˈsuːtkeɪs", "maleta"],
      ["reservation", "ˌrɛzərˈveɪʃən", "reserva"]
    ],
    [
      ["probably", "ˈprɑbəbli", "probablemente"],
      ["perhaps", "pərˈhæps", "quizás"],
      ["promise", "ˈprɑmɪs", "prometer; promesa"],
      ["help", "hɛlp", "ayudar"],
      ["predict", "prɪˈdɪkt", "predecir"]
    ],
    [
      ["appointment", "əˈpɔɪntmənt", "cita"],
      ["meeting", "ˈmiːtɪŋ", "reunión"],
      ["calendar", "ˈkæləndər", "calendario"],
      ["tomorrow", "təˈmɑroʊ", "mañana (día siguiente)"],
      ["next week", "nɛkst wiːk", "la próxima semana"]
    ],
    [
      ["reschedule", "ˌriːˈskɛdʒuːl", "reprogramar"],
      ["cancel", "ˈkænsəl", "cancelar"],
      ["confirm", "kənˈfɜrm", "confirmar"],
      ["accept", "əkˈsɛpt", "aceptar"],
      ["decline", "dɪˈklaɪn", "rechazar cortésmente"]
    ],
    [
      ["budget", "ˈbʌdʒɪt", "presupuesto"],
      ["transportation", "ˌtrænspərˈteɪʃən", "transporte"],
      ["destination", "ˌdɛstəˈneɪʃən", "destino"],
      ["organize", "ˈɔrɡənaɪz", "organizar"],
      ["plan", "plæn", "plan; planificar"]
    ]
  ],

  /* NIVEL 8 */
  [
    [
      ["beautiful", "ˈbjuːtəfəl", "hermoso/a"],
      ["crowded", "ˈkraʊdɪd", "lleno de gente"],
      ["peaceful", "ˈpiːsfəl", "tranquilo/a"],
      ["modern", "ˈmɑdərn", "moderno/a"],
      ["spacious", "ˈspeɪʃəs", "espacioso/a"]
    ],
    [
      ["cheaper", "ˈtʃiːpər", "más barato/a"],
      ["safer", "ˈseɪfər", "más seguro/a"],
      ["larger", "ˈlɑrdʒər", "más grande"],
      ["better", "ˈbɛtər", "mejor"],
      ["worse", "wɜrs", "peor"]
    ],
    [
      ["best", "bɛst", "el/la mejor"],
      ["worst", "wɜrst", "el/la peor"],
      ["smallest", "ˈsmɔləst", "el/la más pequeño/a"],
      ["fastest", "ˈfæstəst", "el/la más rápido/a"],
      ["most comfortable", "moʊst ˈkʌmfərtəbəl", "el/la más cómodo/a"]
    ],
    [
      ["too", "tuː", "demasiado"],
      ["enough", "ɪˈnʌf", "suficiente"],
      ["heavy", "ˈhɛvi", "pesado/a"],
      ["expensive", "ɪkˈspɛnsɪv", "caro/a"],
      ["suitable", "ˈsuːtəbəl", "adecuado/a"]
    ],
    [
      ["who", "huː", "que; quien (personas)"],
      ["which", "wɪtʃ", "que; el/la cual (cosas)"],
      ["where", "wɛr", "donde (lugares)"],
      ["guide", "ɡaɪd", "guía"],
      ["visitor", "ˈvɪzɪtər", "visitante"]
    ],
    [
      ["recommend", "ˌrɛkəˈmɛnd", "recomendar"],
      ["option", "ˈɑpʃən", "opción"],
      ["quality", "ˈkwɑləti", "calidad"],
      ["reliable", "rɪˈlaɪəbəl", "confiable"],
      ["value", "ˈvæljuː", "valor"]
    ]
  ],

  /* NIVEL 9 */
  [
    [
      ["been", "bɪn", "sido; estado"],
      ["seen", "siːn", "visto"],
      ["eaten", "ˈiːtən", "comido"],
      ["written", "ˈrɪtən", "escrito"],
      ["done", "dʌn", "hecho"]
    ],
    [
      ["ever", "ˈɛvər", "alguna vez"],
      ["never", "ˈnɛvər", "nunca"],
      ["abroad", "əˈbrɔd", "en/al extranjero"],
      ["climbed", "klaɪmd", "escalado"],
      ["tried", "traɪd", "probado; intentado"]
    ],
    [
      ["already", "ɔlˈrɛdi", "ya"],
      ["yet", "jɛt", "ya; todavía (según contexto)"],
      ["just", "dʒʌst", "acabar de (en este uso)"],
      ["finished", "ˈfɪnɪʃt", "terminado"],
      ["arrived", "əˈraɪvd", "llegado"]
    ],
    [
      ["since", "sɪns", "desde"],
      ["for", "fɔr", "durante (duración)"],
      ["years", "jɪrz", "años"],
      ["months", "mʌnθs", "meses"],
      ["recently", "ˈriːsəntli", "recientemente"]
    ],
    [
      ["last year", "læst jɪr", "el año pasado"],
      ["ago", "əˈɡoʊ", "hace (tiempo)"],
      ["experience", "ɪkˈspɪriəns", "experiencia"],
      ["visited", "ˈvɪzɪtɪd", "visitó; visitado"],
      ["returned", "rɪˈtɜrnd", "regresó; regresado"]
    ],
    [
      ["believe", "bɪˈliːv", "creer"],
      ["however", "haʊˈɛvər", "sin embargo"],
      ["for example", "fər ɪɡˈzæmpəl", "por ejemplo"],
      ["opinion", "əˈpɪnjən", "opinión"],
      ["evidence", "ˈɛvədəns", "evidencia"]
    ]
  ],

  /* NIVEL 10 */
  [
    [
      ["advice", "ədˈvaɪs", "consejo(s)"],
      ["rest", "rɛst", "descansar"],
      ["healthy", "ˈhɛlθi", "saludable"],
      ["should", "ʃʊd", "debería"],
      ["could", "kʊd", "podría"]
    ],
    [
      ["rule", "ruːl", "regla"],
      ["responsibility", "rɪˌspɑnsəˈbɪləti", "responsabilidad"],
      ["required", "rɪˈkwaɪərd", "obligatorio; requerido"],
      ["allowed", "əˈlaʊd", "permitido"],
      ["forbidden", "fərˈbɪdən", "prohibido"]
    ],
    [
      ["might", "maɪt", "podría (posibilidad)"],
      ["cause", "kɔz", "causa"],
      ["damage", "ˈdæmɪdʒ", "daño"],
      ["fault", "fɔlt", "falla; culpa"],
      ["possible", "ˈpɑsəbəl", "posible"]
    ],
    [
      ["heat", "hiːt", "calentar"],
      ["melt", "mɛlt", "derretirse"],
      ["freeze", "friːz", "congelarse"],
      ["result", "rɪˈzʌlt", "resultado"],
      ["condition", "kənˈdɪʃən", "condición"]
    ],
    [
      ["unless", "ənˈlɛs", "a menos que"],
      ["consequence", "ˈkɑnsəkwɛns", "consecuencia"],
      ["decision", "dɪˈsɪʒən", "decisión"],
      ["risk", "rɪsk", "riesgo"],
      ["prevent", "prɪˈvɛnt", "prevenir"]
    ],
    [
      ["solution", "səˈluːʃən", "solución"],
      ["agree", "əˈɡriː", "estar de acuerdo"],
      ["disagree", "ˌdɪsəˈɡriː", "no estar de acuerdo"],
      ["compromise", "ˈkɑmprəmaɪz", "acuerdo intermedio"],
      ["suggest", "səˈdʒɛst", "sugerir"]
    ]
  ],

  /* NIVEL 11 */
  [
    [
      ["walking", "ˈwɔkɪŋ", "caminando"],
      ["driving", "ˈdraɪvɪŋ", "conduciendo"],
      ["sleeping", "ˈsliːpɪŋ", "durmiendo"],
      ["cooking", "ˈkʊkɪŋ", "cocinando"],
      ["raining", "ˈreɪnɪŋ", "lloviendo"]
    ],
    [
      ["while", "waɪl", "mientras"],
      ["when", "wɛn", "cuando"],
      ["rang", "ræŋ", "sonó"],
      ["fell", "fɛl", "se cayó"],
      ["interrupted", "ˌɪntəˈrʌptɪd", "interrumpió"]
    ],
    [
      ["imagine", "ɪˈmædʒɪn", "imaginar"],
      ["would", "wʊd", "auxiliar de hipótesis"],
      ["owned", "oʊnd", "poseía; tuviera (según contexto)"],
      ["choose", "tʃuːz", "elegir"],
      ["opportunity", "ˌɑpərˈtuːnəti", "oportunidad"]
    ],
    [
      ["said", "sɛd", "dijo"],
      ["told", "toʊld", "dijo a; contó a"],
      ["message", "ˈmɛsɪdʒ", "mensaje"],
      ["report", "rɪˈpɔrt", "informar; informe"],
      ["that day", "ðæt deɪ", "ese día"]
    ],
    [
      ["actually", "ˈæktʃuəli", "en realidad"],
      ["let me think", "lɛt mi θɪŋk", "déjame pensar"],
      ["do you mean", "du ju miːn", "quieres decir"],
      ["explain", "ɪkˈspleɪn", "explicar"],
      ["repeat", "rɪˈpiːt", "repetir"]
    ],
    [
      ["perspective", "pərˈspɛktɪv", "perspectiva"],
      ["witness", "ˈwɪtnəs", "testigo"],
      ["account", "əˈkaʊnt", "relato; versión"],
      ["reaction", "riˈækʃən", "reacción"],
      ["meanwhile", "ˈmiːnwaɪl", "mientras tanto"]
    ]
  ],

  /* NIVEL 12 */
  [
    [
      ["skills", "skɪlz", "habilidades"],
      ["experience", "ɪkˈspɪriəns", "experiencia"],
      ["strength", "strɛŋθ", "fortaleza"],
      ["achievement", "əˈtʃiːvmənt", "logro"],
      ["goals", "ɡoʊlz", "metas"]
    ],
    [
      ["interview", "ˈɪntərvjuː", "entrevista"],
      ["position", "pəˈzɪʃən", "puesto"],
      ["apply", "əˈplaɪ", "solicitar; postularse"],
      ["qualification", "ˌkwɑləfəˈkeɪʃən", "cualificación"],
      ["challenge", "ˈtʃælɪndʒ", "desafío"]
    ],
    [
      ["reservation", "ˌrɛzərˈveɪʃən", "reserva"],
      ["luggage", "ˈlʌɡɪdʒ", "equipaje"],
      ["refund", "ˈriːfʌnd", "reembolso (sustantivo)"],
      ["delay", "dɪˈleɪ", "retraso"],
      ["assistance", "əˈsɪstəns", "asistencia; ayuda"]
    ],
    [
      ["headline", "ˈhɛdˌlaɪn", "titular"],
      ["source", "sɔrs", "fuente"],
      ["published", "ˈpʌblɪʃt", "publicado"],
      ["donated", "ˈdoʊneɪtɪd", "donado"],
      ["summary", "ˈsʌməri", "resumen"]
    ],
    [
      ["argument", "ˈɑrɡjəmənt", "argumento"],
      ["claim", "kleɪm", "afirmación"],
      ["counterpoint", "ˈkaʊntərpɔɪnt", "contrapunto"],
      ["respectfully", "rɪˈspɛktfəli", "respetuosamente"],
      ["support", "səˈpɔrt", "respaldar"]
    ],
    [
      ["purpose", "ˈpɜrpəs", "propósito"],
      ["findings", "ˈfaɪndɪŋz", "hallazgos"],
      ["proposal", "prəˈpoʊzəl", "propuesta"],
      ["conclusion", "kənˈkluːʒən", "conclusión"],
      ["questions", "ˈkwɛstʃənz", "preguntas"]
    ]
  ]
];

/* CONSEJOS SEGÚN LOS SONIDOS DE CADA PALABRA */
function pronunciationTip(ipa) {
  const tips = [];

  if (ipa.includes("θ")) {
    tips.push(
      "/θ/: lengua entre los dientes y aire sin vibración; no es t."
    );
  }

  if (ipa.includes("ð")) {
    tips.push(
      "/ð/: lengua entre los dientes, con vibración de la voz."
    );
  }

  if (ipa.includes("æ")) {
    tips.push(
      "/æ/: abre la boca más que para la e española."
    );
  }

  if (ipa.includes("ɪ")) {
    tips.push(
      "/ɪ/: vocal breve y relajada; no alargues como /iː/."
    );
  }

  if (ipa.includes("ə")) {
    tips.push(
      "/ə/: vocal suave y breve en una sílaba sin énfasis."
    );
  }

  if (ipa.includes("ʃ")) {
    tips.push(
      "/ʃ/: deja salir aire como al pedir silencio."
    );
  }

  if (ipa.includes("ŋ")) {
    tips.push(
      "/ŋ/: sonido nasal al fondo de la boca; evita añadir una g final."
    );
  }

  if (ipa.includes("v")) {
    tips.push(
      "/v/: dientes superiores sobre el labio inferior; usa la voz."
    );
  }

  if (ipa.includes("z")) {
    tips.push(
      "/z/: deja salir aire como en s, con vibración de la voz."
    );
  }

  if (ipa.includes("ɜr") || ipa.includes("ər")) {
    tips.push(
      "La r estadounidense no se golpea ni se hace vibrar como la r española."
    );
  }

  return tips.slice(0, 2).join(" ") ||
    "Pronuncia también la consonante final, si la hay, sin añadir una vocal. Luego usa la expresión en contexto.";
}

/* SELECCIONAR VOCABULARIO DE LA LECCIÓN */
function lessonVocabulary(levelIndex, topicIndex) {
  const source = programCode() === "EFK"
    ? (window.EEA_KIDS_VOCAB || [])
    : EEA_LESSON_VOCAB;
  const topics = source[levelIndex];

  if (!topics) return [];

  if (topicIndex < 6) {
    return topics[topicIndex] || [];
  }

  /*
    Repaso y preparación:
    diez elementos de los seis temas, sin duplicados.

    El repaso comienza por los primeros elementos.
    La preparación comienza por los últimos.
  */
  const pool = [];
  const seen = new Set();

  const longest = Math.max(
    ...topics.map(topic => topic.length)
  );

  for (let offset = 0; offset < longest; offset++) {
    for (const topic of topics) {
      const entry = topic[
        topicIndex === 6
          ? offset
          : topic.length - 1 - offset
      ];

      if (entry && !seen.has(entry[0].toLowerCase())) {
        seen.add(entry[0].toLowerCase());
        pool.push(entry);
      }
    }
  }

  return pool.slice(0, 10);
}

/* MOSTRAR LECCIÓN, REPASO O PREPARACIÓN */
function lesson() {
  assignedContext();
  if (!availableLevel()) { pendingMaterial(); return; }
  if (!Number.isInteger(activeTopic) || activeTopic < 0 || activeTopic > 7) { topics(); return; }
  const level = programLevels()[activeLevel];
  const integrated = activeTopic >= 6;

  const rows = integrated
    ? level.topics
    : [level.topics[activeTopic]];

  currentQuestions = makeQuestions(rows);

  /*
    El repaso reutiliza las preguntas de los seis temas.
    La preparación mezcla su orden.
    No contiene el examen oficial.
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
      <h3>
        Lectura ${index + 1} · ${esc(row[0])}
      </h3>

      <p lang="en">${esc(row[3])}</p>

      <p class="muted">
        Al leer, identifica personas, acciones,
        momentos y razones.
        Busca evidencia para responder;
        no necesitas traducir cada palabra.
      </p>
    </article>
  `).join("");

  const vocabulary = lessonVocabulary(
    activeLevel,
    activeTopic
  );

  const pronunciation = vocabulary
    .map(([word, ipa, meaning]) => `
      <tr>
        <th scope="row" lang="en">
          ${esc(word)}
        </th>

        <td>${esc(meaning)}</td>

        <td>
          <span lang="en">/${esc(ipa)}/</span>
        </td>

        <td>${esc(pronunciationTip(ipa))}</td>
      </tr>
    `)
    .join("");

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
      <h2>3. Vocabulario y pronunciación de esta lección</h2>

      <p>
        ${vocabulary.length} palabras y expresiones
        ${integrated
          ? "recuperadas de los temas del nivel para repasar."
          : "seleccionadas para este tema."}

        Referencia de pronunciación estadounidense
        en alfabeto fonético (IPA).

        La marca ˈ indica que la sílaba siguiente
        lleva el énfasis principal;
        ˌ indica un énfasis secundario.

        Hay variantes válidas de pronunciación.
        La fonética escrita es una guía:
        no sustituye escuchar un modelo
        ni constituye una evaluación oral.
      </p>

      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Palabra o expresión</th>
              <th scope="col">Significado</th>
              <th scope="col">Fonética (IPA)</th>
              <th scope="col">Cómo practicar</th>
            </tr>
          </thead>

          <tbody>${pronunciation}</tbody>
        </table>
      </div>

      <div class="notice">
        <strong>Práctica breve:</strong>

        Lee las palabras en voz alta.
        Elige tres y construye una oración con cada una,
        relacionada con
        ${integrated
          ? "lo aprendido en el nivel"
          : esc(rows[0][0])}.

        En el repaso, intenta recordarlas
        antes de consultar la tabla.
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

        <button type="submit">
          Revisar respuestas
        </button>
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
        ${rows.map(row => `
          <li>${esc(row[10])}</li>
        `).join("")}
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
    if (!access.isAdmin || !PROGRAM_CODES[button.dataset.category]) return;
    category = button.dataset.category;
    levels();
    return;
  }

  if (button.dataset.level !== undefined) {
    const requested = Number(button.dataset.level);
    if (!Number.isInteger(requested) || !programLevels()[requested]) return;
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
  assignedContext();
  if (!availableLevel() || !currentQuestions.length) return;

  const answers = new FormData(event.target);
  let score = 0;

  currentQuestions.forEach((question, index) => {
    const correct =
      answers.get(`q${index}`) === question.correct;

    if (correct) score++;

    const box = document.getElementById(
      `feedback-${index}`
    );

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
