"use strict";

/*
  grammar.js
  Ampliación para la versión de 12 niveles de EEA.

  En index.html, cargar en este orden:
  <script src="./content.js" defer></script>
  <script src="./app.js" defer></script>
  <script src="./grammar.js" defer></script>

  Cada bloque contiene:
  [título, estructuras, reglas, ejemplos, error frecuente]
*/

const EEA_GRAMMAR = {
  be: [
    "Verb to be: identidad y descripción",
    [
      "Afirmativa: I am; you/we/they are; he/she/it is.",
      "Negativa: I am not; you/we/they are not; he/she/it is not.",
      "Pregunta: Am/Is/Are + sujeto + complemento?",
      "Respuesta corta: Yes, I am / No, she isn’t."
    ],
    [
      "Be expresa identidad, estado, edad, origen, ocupación y descripción. El complemento puede ser un nombre, un adjetivo o una frase de lugar.",
      "Formas cortas: I’m, you’re, he’s, she’s, it’s, we’re, they’re. Negativas: isn’t y aren’t; con I, usa I’m not.",
      "Para preguntar, cambia el orden: You are Ana → Are you Ana? No uses do o does con be.",
      "En respuestas afirmativas cortas conserva la forma completa: Yes, I am. No termines esa respuesta con Yes, I’m."
    ],
    [
      "I’m a student. I’m not a teacher. Are you a student?",
      "She is friendly. Is she friendly? — Yes, she is.",
      "How old are you? — I’m nineteen years old.",
      "Where are you from? — I’m from Nicaragua."
    ],
    "Incorrecto: I have nineteen years / She are friendly. Correcto: I am nineteen years old / She is friendly."
  ],

  personal: [
    "Pronombres, posesivos e información personal",
    [
      "Pronombres de sujeto: I, you, he, she, it, we, they.",
      "Posesivo + sustantivo: my, your, his, her, its, our, their.",
      "Preguntas: What is your name? How old are you? How do you spell your name?"
    ],
    [
      "El pronombre realiza la acción o se combina con be: She is Ana. El posesivo indica a quién pertenece algo: Her name is Ana.",
      "El posesivo acompaña al sustantivo: my name, our school, their books. No lleva artículo delante: my name, no the my name.",
      "El posesivo depende de la persona que posee: his sister es la hermana de él; her brother es el hermano de ella.",
      "Para deletrear, di las letras en orden. En un teléfono normalmente se dicen los dígitos individualmente. En correos, @ es at y el punto es dot.",
      "Its es posesivo; it’s significa it is o it has. Your es posesivo; you’re significa you are. Usa datos ficticios en las prácticas."
    ],
    [
      "She is my sister. Her name is Eva.",
      "They are students. Their teacher is patient.",
      "What’s your name? — My name is Ana. A-N-A.",
      "You’re a student. Your school is near the park."
    ],
    "Incorrecto: She name is Ana / Your a student. Correcto: Her name is Ana / You’re a student."
  ],

  articles: [
    "A, an y ocupaciones",
    [
      "A + sonido consonante: a teacher, a student.",
      "An + sonido vocálico: an engineer, an actor.",
      "Plural general: They are teachers, sin a/an."
    ],
    [
      "A/an presentan un sustantivo contable singular que no se ha identificado específicamente. Se eligen por el sonido, no solamente por la primera letra.",
      "Una ocupación singular normalmente necesita artículo después de be: She is a doctor.",
      "El adjetivo se coloca entre artículo y sustantivo: a friendly teacher, an excellent student.",
      "El sonido de la palabra inmediatamente siguiente decide a/an: a teacher, pero an excellent teacher.",
      "A/an no se usan con sustantivos plurales ni con incontables en su sentido básico."
    ],
    [
      "He is an engineer. She is a nurse.",
      "She is an excellent teacher.",
      "They are students at our school.",
      "He works at a hospital."
    ],
    "Incorrecto: She is teacher / They are a teachers. Correcto: She is a teacher / They are teachers."
  ],

  have: [
    "Have y has: familia y posesión",
    [
      "I/you/we/they + have + complemento.",
      "He/she/it + has + complemento.",
      "Negativa: don’t/doesn’t have.",
      "Pregunta: Do/Does + sujeto + have…?"
    ],
    [
      "Have puede expresar posesión y relaciones familiares: I have a bike; she has two brothers.",
      "En tercera persona afirmativa, have cambia a has. Cuando aparece does o doesn’t, el verbo vuelve a have.",
      "Distingue have de be: I have a sister describe una relación; I am a sister describe quién eres.",
      "No traduzcas la edad con have. En inglés usa be: I am twenty years old.",
      "Las respuestas cortas usan el auxiliar de la pregunta: Does she have a car? — Yes, she does."
    ],
    [
      "My brother has a daughter.",
      "She doesn’t have a car. Does she have a bike?",
      "We have two cousins. They are friendly.",
      "Do you have a sister? — No, I don’t."
    ],
    "Incorrecto: Does she has a brother? Correcto: Does she have a brother?"
  ],

  demos: [
    "This, that, these y those",
    [
      "Cerca: this + singular; these + plural.",
      "Lejos: that + singular; those + plural.",
      "This/That is…; These/Those are…",
      "Pregunta: Is this…? / Are those…?"
    ],
    [
      "Los demostrativos pueden acompañar a un sustantivo o aparecer solos cuando el objeto está claro.",
      "La cercanía puede ser física o depender de la situación comunicativa.",
      "Mantén la concordancia entre demostrativo, sustantivo y be.",
      "En respuestas cortas usa it para singular y they para plural.",
      "Puedes combinar demostrativos con posesivos: This is my book. Those are her keys."
    ],
    [
      "This is my bag. These are my books.",
      "That teacher is friendly. Those students are new.",
      "Are these your keys? — Yes, they are.",
      "Is that your phone? — No, it isn’t."
    ],
    "Incorrecto: This are my books. Correcto: These are my books."
  ],

  there: [
    "There is y there are: existencia",
    [
      "There is + singular o incontable.",
      "There are + plural.",
      "Negativa: There isn’t / There aren’t.",
      "Pregunta: Is there…? / Are there…?"
    ],
    [
      "Esta estructura indica que algo existe en un lugar. No equivale a describir dónde está un objeto ya identificado.",
      "Usa a/an con contable singular: There is a bank.",
      "Con plural puedes usar un número o some: There are two stores; there are some stores.",
      "Respuestas cortas: Yes, there is / No, there isn’t; Yes, there are / No, there aren’t.",
      "Para indicar ausencia total: There are no banks o There aren’t any banks."
    ],
    [
      "There is a pharmacy near my house.",
      "There aren’t any banks here.",
      "Is there a school? — Yes, there is.",
      "There is some water on the table."
    ],
    "Incorrecto: There is two stores. Correcto: There are two stores."
  ],

  place: [
    "Preposiciones de lugar y ubicación",
    [
      "Where is + singular?",
      "Where are + plural?",
      "Sujeto + be + preposición + lugar de referencia.",
      "Expresiones: next to, between, across from, behind, in front of."
    ],
    [
      "Next to significa al lado; between sitúa algo entre referencias; across from indica enfrente, al otro lado.",
      "Behind significa detrás; in front of significa delante.",
      "No omitas be al preguntar o responder.",
      "Para un sujeto plural utiliza are aunque el lugar de referencia sea singular.",
      "Para una ruta sencilla puedes combinar ubicación con instrucciones: go straight, turn left, turn right."
    ],
    [
      "Where is the bank? — It is next to the pharmacy.",
      "The park is between the school and the library.",
      "Where are the keys? — They are on the table.",
      "Go straight and turn left. The school is across from the bank."
    ],
    "Incorrecto: Where the bank? / In front the school. Correcto: Where is the bank? / In front of the school."
  ],

  time: [
    "Horas, días, fechas y horarios",
    [
      "At + hora: at eight thirty.",
      "On + día o fecha: on Saturday; on June fifth.",
      "In + mes, año o parte del día: in June; in 2026; in the morning.",
      "Pregunta: What time…? / When…?"
    ],
    [
      "Pregunta What time…? cuando necesitas una hora. Usa When…? para preguntar de forma más general por el momento.",
      "Para decir la hora usa It’s + hora. Para el horario de un evento usa The class is at…",
      "A quarter past eight = 8:15; half past eight = 8:30; a quarter to nine = 8:45.",
      "También puedes decir eight fifteen, eight thirty y eight forty-five.",
      "Expresiones frecuentes sin preposición: today, tomorrow, yesterday, every Saturday.",
      "Excepción útil: at night."
    ],
    [
      "What time is class? — It’s at eight thirty.",
      "The event is on June fifth.",
      "I study in the evening.",
      "We meet every Saturday."
    ],
    "Incorrecto: at Saturday / on eight. Correcto: on Saturday / at eight."
  ],

  present: [
    "Present Simple: formas completas",
    [
      "Afirmativa: I/you/we/they + verbo base.",
      "Afirmativa: he/she/it + verbo con s/es.",
      "Negativa: sujeto + don’t/doesn’t + verbo base.",
      "Pregunta: Do/Does + sujeto + verbo base?",
      "Pregunta informativa: WH + do/does + sujeto + verbo base?"
    ],
    [
      "Se usa para hábitos, rutinas y hechos generales. Señales frecuentes: every day, on Mondays, usually.",
      "Tercera persona: work → works; watch → watches; study → studies.",
      "Con vocal + y conserva y: play → plays. Formas frecuentes: have → has; go → goes; do → does.",
      "Después de does o doesn’t no añadas s al verbo: Does she work? She doesn’t work.",
      "Respuestas cortas: Yes, I do / No, I don’t; Yes, he does / No, he doesn’t.",
      "Be tiene su propia estructura: Is she tired?, no Does she be tired?"
    ],
    [
      "I work at a store. She works at a school.",
      "She doesn’t study on Sundays.",
      "Does she study on Saturdays? — Yes, she does.",
      "What time do you get up? — I get up at six."
    ],
    "Incorrecto: I am work / Does he works? Correcto: I work / Does he work?"
  ],

  frequency: [
    "Adverbios y expresiones de frecuencia",
    [
      "Sujeto + adverbio + verbo principal.",
      "Sujeto + be + adverbio + complemento.",
      "How often + do/does + sujeto + verbo?"
    ],
    [
      "Always indica siempre; usually, normalmente; sometimes, a veces; rarely, rara vez; never, nunca.",
      "Estas palabras expresan frecuencia aproximada; no son porcentajes exactos.",
      "La posición habitual es antes del verbo principal, pero después de be.",
      "Sometimes también puede ir al inicio o al final.",
      "Once a week, twice a month y three times a year suelen ir al final.",
      "Never ya expresa negación; evita don’t never en inglés estándar."
    ],
    [
      "I usually walk to school.",
      "She is never late.",
      "How often do you swim? — Twice a week.",
      "Sometimes, we study together."
    ],
    "Incorrecto: I don’t never study. Correcto: I never study."
  ],

  preferences: [
    "Gustos: verbos seguidos de ing",
    [
      "Sujeto + like/love/enjoy/hate + verbo ing.",
      "Sujeto + don’t/doesn’t like + verbo ing.",
      "Do/Does + sujeto + like + verbo ing?"
    ],
    [
      "Enjoy exige ing cuando va seguido de otro verbo.",
      "Like, love y hate también pueden admitir infinitivo en otros contextos; aquí practicamos ing.",
      "Reglas básicas: read → reading; dance → dancing; run → running.",
      "No todos los verbos duplican consonante: sigue el patrón de cada palabra.",
      "La tercera persona afecta al primer verbo: She enjoys reading.",
      "Después de doesn’t usa enjoy o like sin s."
    ],
    [
      "I enjoy cooking. She loves dancing.",
      "He doesn’t like running.",
      "Do you like reading? — Yes, I do.",
      "My sister enjoys drawing."
    ],
    "Incorrecto: I enjoy to read / She likes dance. Correcto: I enjoy reading / She likes dancing."
  ],

  reasons: [
    "Because y opiniones sencillas",
    [
      "Idea + because + sujeto + verbo.",
      "I think + oración.",
      "I like + actividad + because + razón.",
      "Because of + sustantivo o frase nominal."
    ],
    [
      "Because introduce una razón: I stay home because I am tired.",
      "La razón después de because normalmente necesita una estructura completa con sujeto y verbo.",
      "Because of tiene otra estructura: because of the rain.",
      "No intercambies because y because of sin cambiar el complemento.",
      "Si empiezas por la causa usa coma: Because I am tired, I stay home.",
      "Evita añadir so como segunda conexión en esa misma estructura básica."
    ],
    [
      "I like swimming because it is relaxing.",
      "We stayed home because of the rain.",
      "I think reading is useful because it expands vocabulary.",
      "Because the park is nearby, we walk there."
    ],
    "Incorrecto: because is interesting / because of it is raining. Correcto: because it is interesting / because it is raining."
  ],

  continuous: [
    "Present Continuous y contraste con hábitos",
    [
      "Afirmativa: sujeto + am/is/are + verbo ing.",
      "Negativa: sujeto + am/is/are + not + verbo ing.",
      "Pregunta: Am/Is/Are + sujeto + verbo ing?"
    ],
    [
      "Describe acciones en curso ahora o situaciones temporales.",
      "Present Simple describe hábitos: I work every day. Present Continuous describe lo que ocurre ahora: I’m working now.",
      "No omitas be. Para preguntar invierte be y sujeto; no uses do/does.",
      "Ortografía: make → making; sit → sitting; lie → lying.",
      "Verbos de estado como know y want normalmente usan forma simple en sus sentidos habituales."
    ],
    [
      "She is reading now. She isn’t watching TV.",
      "Are they playing? — Yes, they are.",
      "I usually walk, but today I’m taking the bus.",
      "He is working at home this week."
    ],
    "Incorrecto: She reading / Do you working? Correcto: She is reading / Are you working?"
  ],

  invitations: [
    "Invitaciones, propuestas y respuestas",
    [
      "Would you like to + verbo base?",
      "Let’s + verbo base.",
      "How about + verbo ing?",
      "Could we + verbo base?"
    ],
    [
      "Would you like…? invita en una situación concreta.",
      "Do you like…? pregunta por gustos generales; no tiene la misma intención.",
      "I’d love to y That sounds good aceptan una propuesta.",
      "I’d love to, but… rechaza con una razón. Ofrece una alternativa cuando sea posible.",
      "Para cambiar un acuerdo usa Could we meet…? o Can we move it to…?",
      "Confirma día, hora y lugar para evitar ambigüedad."
    ],
    [
      "Would you like to watch a movie? — I’d love to.",
      "Let’s meet at four.",
      "How about meeting at the park?",
      "I can’t on Friday. Could we meet on Saturday instead?"
    ],
    "Incorrecto: Let’s to go / How about go? Correcto: Let’s go / How about going?"
  ],

  nouns: [
    "Sustantivos contables e incontables",
    [
      "Contable singular: a/an + sustantivo.",
      "Contable plural: número + sustantivo plural.",
      "Incontable: some + sustantivo.",
      "Cantidad: recipiente o unidad + of + sustantivo."
    ],
    [
      "Los contables se pueden contar como unidades individuales.",
      "Los incontables expresan materiales o conceptos que normalmente no se cuentan directamente en ese sentido.",
      "En el uso básico, rice, milk, water y information no llevan a/an ni plural.",
      "Para contarlos usa porciones o recipientes: two bags of rice, a glass of water.",
      "Algunas palabras cambian según el sentido: chicken puede ser carne incontable o un animal contable.",
      "Comprueba el contexto antes de elegir el artículo o la cantidad."
    ],
    [
      "I need two eggs and some milk.",
      "There is rice on the plate.",
      "We bought two bottles of water.",
      "There are three chickens on the farm."
    ],
    "Incorrecto: two rices / an information. Correcto: two bags of rice / some information."
  ],

  quantity: [
    "Some, any, much, many, a few y a little",
    [
      "Some/any/a lot of + plural contable o incontable.",
      "Many/a few + plural contable.",
      "Much/a little + incontable.",
      "How many + plural? How much + incontable?"
    ],
    [
      "Some es frecuente en afirmaciones; any en negativas y preguntas neutrales.",
      "En ofrecimientos y peticiones puede usarse some: Would you like some water?",
      "How many pide número de unidades; How much pide cantidad incontable o precio.",
      "A few y a little indican una cantidad pequeña disponible.",
      "Few y little, sin a, suelen enfatizar insuficiencia.",
      "A lot of funciona con ambos tipos: a lot of apples / a lot of milk.",
      "Much suele ser más natural en preguntas y negativas que en afirmaciones informales."
    ],
    [
      "We have some rice, but we don’t have any eggs.",
      "How many apples do we need?",
      "How much milk is there?",
      "We need a few tomatoes and a little oil."
    ],
    "Incorrecto: much apples / a few milk. Correcto: many apples / a little milk."
  ],

  requests: [
    "Peticiones corteses y would like",
    [
      "I would like / I’d like + sustantivo.",
      "I’d like to + verbo base.",
      "Could I have + sustantivo, please?",
      "Could you + verbo base?"
    ],
    [
      "Would like expresa un deseo o una petición cortés.",
      "Like expresa gusto general: I like soup. I’d like soup expresa lo que deseas pedir.",
      "Could I have…? pide algo para ti. Could you…? pide que otra persona haga algo.",
      "Después de would y could usa forma base, sin s.",
      "Con would like to conserva to antes del verbo: I’d like to order."
    ],
    [
      "I’d like the chicken, please.",
      "Could I have some water without ice?",
      "Could you bring the bill?",
      "I’d like to check my reservation."
    ],
    "Incorrecto: I would like order / Could you to help? Correcto: I would like to order / Could you help?"
  ],

  pastbe: [
    "Was y were",
    [
      "I/he/she/it + was.",
      "You/we/they + were.",
      "Negativa: wasn’t / weren’t.",
      "Pregunta: Was/Were + sujeto + complemento?"
    ],
    [
      "Was y were son las formas pasadas de be.",
      "Expresan estado, identidad o ubicación en un momento terminado.",
      "Usa yesterday, last night, last weekend o una fecha pasada para situar el relato.",
      "Expresiones con yesterday o last no necesitan in/on/at delante: yesterday, last Saturday.",
      "Respuestas cortas: Yes, I was / No, I wasn’t; Yes, they were / No, they weren’t.",
      "No necesitas did con be en este patrón."
    ],
    [
      "I was at home yesterday. They were at school.",
      "She wasn’t tired.",
      "Were you busy? — Yes, I was.",
      "Where were they last night?"
    ],
    "Incorrecto: Did you were tired? Correcto: Were you tired?"
  ],

  past: [
    "Past Simple: afirmaciones, negativas y preguntas",
    [
      "Afirmativa: sujeto + verbo en pasado.",
      "Negativa: sujeto + didn’t + verbo base.",
      "Pregunta: Did + sujeto + verbo base?",
      "Pregunta informativa: WH + did + sujeto + verbo base?"
    ],
    [
      "Describe acciones terminadas. La forma del verbo es la misma para todos los sujetos, excepto be.",
      "Regulares: work/work

Incorrecto: “I have nineteen years / She are friendly.” Correcto: “I am nineteen years old / She is friendly.” Aquí va el contenido: "use strict"; const EEA_GRAMMAR = { be: identidad y descripción", I am; you/we/they are; he/she/it is. Negativa: I am not; you/we/they are not; he/she/it is not. Pregunta: Am/Is/Are + sujeto + complemento? Respuesta corta: Yes, I am / No, she isn’t. Be expresa identidad, estado, edad, origen, ocupación y descripción. Formas cortas: I’m, you’re, he’s, she’s, it’s, we’re, they’re. Con I, usa I’m not en negativa. No uses do/does con be. En preguntas cambia el orden: You are Ana → Are you Ana? En respuestas afirmativas cortas usa la forma completa: Yes, I am. Afirmativa: I/you/we/they + verbo base; he/she/it + verbo con s/es. Negativa: don’t/doesn’t + verbo base, pregunta con Do/Does + sujeto + verbo base. En tercera persona, el verbo lleva s/es; después de does/doesn’t no añadas s al verbo. Respuestas cortas usan do/does.

Se usa para hábitos, rutinas y
