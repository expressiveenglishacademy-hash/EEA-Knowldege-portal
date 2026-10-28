/*
  EEA: 12 niveles.

  Cada nivel contiene:
  - 6 temas de enseñanza.
  - Pronunciación de referencia del nivel.

  app.js crea las secciones 7 y 8:
  repaso integrado y preparación para evaluación.

  Cada tema contiene, en este orden:
  0: título
  1: explicación
  2: ejemplo
  3: lectura
  4: pregunta de comprensión
  5: respuesta correcta de lectura
  6: distractor de lectura
  7: ejercicio de gramática
  8: respuesta correcta de gramática
  9: distractor de gramática
  10: actividad comunicativa
*/

window.EEA = [

  // NIVEL 1
  {
    title: "Me and My Identity",

    sounds: [
      [
        "name",
        "/neɪm/",
        "NÉIM",
        "Una sílaba. Desliza e hacia i y termina en m."
      ],
      [
        "teacher",
        "/ˈtiːtʃər/",
        "TÍ-cher",
        "Primera sílaba fuerte. Referencia estadounidense."
      ]
    ],

    topics: [
      [
        "Saludos y presentaciones",
        "Con I usa am; con you, are. I am → I’m. You are → you’re. Hello y Hi son saludos; Goodbye es una despedida.",
        "Hello! I’m Ana. What’s your name? — I’m Leo. Nice to meet you.",
        "Hello! My name is Ana. I am a student. Leo is my friend. We say goodbye after class.",
        "¿Cómo se llama la estudiante?",
        "Ana",
        "Leo",
        "I ___ Ana.",
        "am",
        "are",
        "Saluda, di tu nombre y pregunta el de otra persona."
      ],
      [
        "Alfabeto e información personal",
        "How do you spell…? pide deletrear. Expresa edad con I am, no con I have. En correos, @ se lee at y el punto dot. Usa datos ficticios.",
        "How do you spell Ana? — A, N, A. I’m eighteen years old.",
        "My name is Luis: L-U-I-S. I am nineteen years old. My practice email is luis@example.com. It is not my real email.",
        "¿Qué edad tiene Luis?",
        "Nineteen",
        "Eighteen",
        "I ___ nineteen years old.",
        "am",
        "have",
        "Deletrea tu nombre y di tu edad, un teléfono y un correo ficticios."
      ],
      [
        "Países y nacionalidades",
        "Usa from + país: from Nicaragua. Para nacionalidad, usa I’m Nicaraguan, sin from. Países y nacionalidades llevan mayúscula.",
        "Where are you from? — I’m from Nicaragua. I’m Nicaraguan.",
        "I am Marta. I am from Mexico. I am Mexican. My friend Tom is from Canada. He is Canadian.",
        "¿De dónde es Tom?",
        "Canada",
        "Mexico",
        "I’m from ___.",
        "Nicaragua",
        "Nicaraguan",
        "Pregunta y responde sobre el origen de dos personas ficticias."
      ],
      [
        "Personas y ocupaciones",
        "Con he y she usa is; con they, are. Antes de una ocupación singular usa a o an según el sonido inicial: a teacher, an engineer.",
        "She is a teacher. He is an engineer. They are students.",
        "Sara is a doctor. She works at a hospital. Her brother is a teacher. He works at a school. They live in Masaya.",
        "¿Dónde trabaja el hermano de Sara?",
        "At a school",
        "At a hospital",
        "They ___ students.",
        "are",
        "is",
        "Describe tres personas y sus ocupaciones y lugares de trabajo."
      ],
      [
        "Descripción personal",
        "Usa be + adjetivo: I’m friendly. Los adjetivos no se pluralizan. My, your, his, her, its, our y their van antes del sustantivo.",
        "Her name is Ana. She is friendly. They are kind.",
        "My name is Ben. I am quiet and patient. My sister is Eva. She is friendly and creative. Our teacher is kind.",
        "¿Quién es creativa?",
        "Eva",
        "Ben",
        "___ name is Eva. (Ella)",
        "Her",
        "His",
        "Descríbete y describe a alguien importante usando cualidades y posesivos."
      ],
      [
        "Mi presentación completa",
        "Integra preguntas con be: Where are you from? Con live, work y study, usa I live/work/study. Para preguntar con live: Where do you live?",
        "I’m Ana. I live in Masaya. I study English. Where do you live?",
        "I am Diego. I am from Nicaragua and I live in La Concepción. I work at a store. I study English on Saturdays. I am friendly.",
        "¿Cuándo estudia inglés Diego?",
        "On Saturdays",
        "On Mondays",
        "I ___ English.",
        "study",
        "am study",
        "Preséntate durante 1–2 minutos y responde preguntas sobre origen, residencia y ocupación."
      ]
    ]
  },

  // NIVEL 2
  {
    title: "My Family and Community",

    sounds: [
      [
        "family",
        "/ˈfæməli/",
        "FÁ-me-li",
        "/æ/ requiere la boca más abierta que la e española; la aproximación no es exacta."
      ],
      [
        "three",
        "/θriː/",
        "thrí (aprox.)",
        "/θ/: lengua entre dientes y aire sin vibración; no equivale a t."
      ]
    ],

    topics: [
      [
        "Mi familia",
        "I, you, we y they usan have; he y she usan has. Family incluye mother, father, sister, brother, parents y children.",
        "I have two sisters. My brother has a daughter.",
        "Elena has two brothers and one sister. Her sister has a baby. Elena lives with her parents. They eat dinner together.",
        "¿Cuántos hermanos varones tiene Elena?",
        "Two",
        "Three",
        "My sister ___ a son.",
        "has",
        "have",
        "Presenta a tu familia o una familia ficticia y explica sus relaciones."
      ],
      [
        "Posesiones y relaciones",
        "This y that son singulares; these y those son plurales. This/these indican cercanía; that/those, distancia. Usa my, your, his o her para posesión.",
        "This is my bag. Those are her books.",
        "This is my family photo. These are my parents beside me. That is my cousin near the door. Those are his books on the far table.",
        "¿De quién son los libros?",
        "The cousin’s",
        "The parents’",
        "___ are my books here.",
        "These",
        "This",
        "Identifica personas y pertenencias cercanas y lejanas."
      ],
      [
        "Mi vecindario",
        "There is se usa con singular; there are, con plural. Para preguntar: Is there…? / Are there…? Aprende park, bank, school, store y pharmacy.",
        "There is a park. There are two schools.",
        "There is a park in my neighborhood. There are two stores near the park. There is a pharmacy, but there is no bank.",
        "¿Qué lugar NO hay?",
        "A bank",
        "A pharmacy",
        "There ___ two stores.",
        "are",
        "is",
        "Describe cinco lugares que hay o no hay en tu comunidad."
      ],
      [
        "Ubicación y direcciones",
        "Where is…? pregunta por singular; Where are…?, por plural. Usa next to, between, across from, behind e in front of para ubicar.",
        "Where is the bank? — It is next to the pharmacy.",
        "The bank is next to the pharmacy. The school is across from the bank. The bus stop is in front of the school. Ana waits at the bus stop.",
        "¿Dónde está la parada?",
        "In front of the school",
        "Behind the pharmacy",
        "Where ___ the bank?",
        "is",
        "are",
        "Explica la ubicación de tres lugares en un mapa."
      ],
      [
        "La hora y los eventos",
        "Pregunta What time…? Usa at con horas, on con días y fechas. It’s eight thirty = 8:30. Days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.",
        "Class is at eight thirty on Saturday. The event is on June fifth.",
        "Our English class is on Saturday at eight thirty. The school festival is on June fifth at ten. I arrive fifteen minutes before class.",
        "¿A qué hora es el festival?",
        "At ten",
        "At eight thirty",
        "Class is ___ Saturday.",
        "on",
        "at",
        "Pregunta y comunica horarios y fechas de tres eventos."
      ],
      [
        "Preguntas cotidianas",
        "Con be invierte: Are you a student? Con otros verbos usa do/does + sujeto + verbo base. No mezcles: Do you live…?, no Are you live…?",
        "Are you a student? Where do you live? What does your sister do?",
        "Nora interviews Pablo. He is a student. He lives near the park and studies English on Saturdays. His sister works at a bank.",
        "¿Dónde trabaja la hermana de Pablo?",
        "At a bank",
        "At a school",
        "___ you live near the park?",
        "Do",
        "Are",
        "Haz una entrevista sobre familia, residencia y horarios."
      ]
    ]
  },

  // NIVEL 3
  {
    title: "My Daily Life",

    sounds: [
      [
        "works",
        "/wɜrks/",
        "uérks (aprox.)",
        "La terminación suena /s/. No añadas una vocal después."
      ],
      [
        "watches",
        "/ˈwɑtʃɪz/",
        "UÁ-chiz",
        "La terminación agrega una sílaba /ɪz/."
      ]
    ],

    topics: [
      [
        "Actividades diarias",
        "Aprende get up, have breakfast, go to school/work, have lunch, get home y go to bed. Ordena acciones con first, then y finally.",
        "First, I get up. Then, I have breakfast. Finally, I go to school.",
        "I get up at six. I have breakfast at six thirty. Then I go to school. I get home at three and go to bed at nine.",
        "¿Qué hace después de desayunar?",
        "Goes to school",
        "Goes to bed",
        "I ___ breakfast at six thirty.",
        "have",
        "go",
        "Ordena y menciona cinco actividades de tu día."
      ],
      [
        "Mi rutina entre semana",
        "Present Simple afirmativo: I/you/we/they + verbo base. Usa at con horas y on con días. No añadas am delante de un verbo de rutina.",
        "I work in the morning. We study at night.",
        "We live in Masaya. We take the bus at seven and work at a store. We finish at five. At night, we study English at home.",
        "¿Cuándo estudian inglés?",
        "At night",
        "At seven in the morning",
        "We ___ English at night.",
        "study",
        "studies",
        "Explica tu rutina entre semana en orden."
      ],
      [
        "Las rutinas de otras personas",
        "Con he/she/it añade s; después de ch, sh, ss, x y algunos verbos en o, es. Con consonante + y: study → studies. Have → has.",
        "She works. He watches TV. My sister studies English.",
        "My sister gets up early. She studies at university and works at a café. At night, she watches a short program and reads a book.",
        "¿Dónde trabaja la hermana?",
        "At a café",
        "At a bank",
        "She ___ English.",
        "studies",
        "study",
        "Describe la rutina de otra persona con al menos cinco verbos."
      ],
      [
        "Hábitos que no tengo",
        "Usa don’t con I/you/we/they y doesn’t con he/she/it. Después va verbo base: doesn’t work, no doesn’t works.",
        "I don’t drink coffee. She doesn’t work on Sundays.",
        "Luis works from Monday to Friday. He doesn’t work on Sundays. I work on Saturdays, but I don’t work on Mondays. We both enjoy our free days.",
        "¿Qué día NO trabaja Luis?",
        "Sunday",
        "Friday",
        "She doesn’t ___ on Sundays.",
        "work",
        "works",
        "Compara tres hábitos que tienes y tres que no tienes."
      ],
      [
        "Entrevistas sobre rutinas",
        "Usa Do/Does + sujeto + verbo base. Responde Yes, I do / No, I don’t o Yes, she does / No, she doesn’t.",
        "Does he study? — Yes, he does. What time do you get up?",
        "Ana interviews Joel. He gets up at five thirty and takes the bus to work. He studies English after dinner. He doesn’t drive to work.",
        "¿Cómo va Joel al trabajo?",
        "By bus",
        "By car",
        "Does she ___ English?",
        "study",
        "studies",
        "Entrevista a alguien sobre su rutina y comunica dos respuestas."
      ],
      [
        "Tiempo y frecuencia",
        "Always, usually, sometimes, rarely y never suelen ir antes del verbo principal y después de be. Never ya tiene sentido negativo.",
        "I usually walk to school. She is always early.",
        "I usually walk to school, but I sometimes take the bus when it rains. I never miss English class. My brother is usually early for work.",
        "¿Cuándo toma el bus el narrador?",
        "When it rains",
        "Every day",
        "She is ___ early.",
        "always",
        "does",
        "Describe una semana típica usando cinco expresiones de frecuencia."
      ]
    ]
  },

  // NIVEL 4
  {
    title: "Free Time and Current Activities",

    sounds: [
      [
        "enjoy",
        "/ɪnˈdʒɔɪ/",
        "in-DYÓI (aprox.)",
        "La segunda sílaba es fuerte. /dʒ/ no equivale exactamente a la y española."
      ],
      [
        "playing",
        "/ˈpleɪɪŋ/",
        "PLÉI-ing",
        "En /ŋ/ la parte posterior de la lengua toca el paladar; no agregues una g final separada."
      ]
    ],

    topics: [
      [
        "Actividades de tiempo libre",
        "Para hábitos de tiempo libre usa Present Simple: play soccer, read books, watch movies, listen to music y go swimming.",
        "I read books on Sundays. My friends play soccer after school.",
        "María reads adventure books on Sundays. Her friends play soccer in the afternoon. They meet at the park after the game and talk about their week.",
        "¿Qué lee María?",
        "Adventure books",
        "Sports magazines",
        "My friends ___ soccer.",
        "play",
        "plays",
        "Habla de tres actividades que haces en tu tiempo libre."
      ],
      [
        "Gustos y preferencias",
        "Después de enjoy usa verbo en ing. Like, love y hate también admiten ing; esta práctica usa ese patrón. Don’t like expresa que algo no te gusta.",
        "I enjoy reading. She loves dancing. We don’t like running.",
        "I love cooking with my family. My brother enjoys drawing, but he doesn’t like dancing. On weekends, we listen to music together.",
        "¿Qué actividad NO le gusta al hermano?",
        "Dancing",
        "Drawing",
        "She enjoys ___.",
        "reading",
        "read",
        "Expresa cuatro preferencias usando actividades en ing."
      ],
      [
        "Razones y opiniones",
        "Usa because para explicar una razón. I think… presenta una opinión. Conecta tu preferencia con una explicación concreta.",
        "I like swimming because it is relaxing. I think reading is useful.",
        "Leo likes cycling because he can explore new places. He thinks exercise is important. His cousin prefers drawing because she enjoys creating characters.",
        "¿Por qué le gusta a Leo montar bicicleta?",
        "He can explore new places",
        "He enjoys creating characters",
        "I like reading ___ it is interesting.",
        "because",
        "but because of",
        "Da tres opiniones y explica cada una con because."
      ],
      [
        "Lo que está pasando ahora",
        "Present Continuous: am/is/are + verbo ing. Para negar, añade not: isn’t working. Now indica lo que ocurre ahora.",
        "She is reading now. They aren’t watching TV.",
        "It is Saturday afternoon. Ana is reading in the living room. Her brothers are playing outside. Their mother isn’t working; she is resting.",
        "¿Qué hace la madre ahora?",
        "She is resting",
        "She is working",
        "They ___ playing now.",
        "are",
        "is",
        "Describe cinco acciones en una escena real o imaginaria."
      ],
      [
        "Hábitos y acciones actuales",
        "Present Simple expresa hábitos; Present Continuous, acciones en curso. Compara every day con right now.",
        "I usually walk, but today I’m taking the bus.",
        "Ben usually works at the office. Today he is working at home because the office is closed. He normally eats out, but he is cooking lunch now.",
        "¿Por qué trabaja hoy en casa Ben?",
        "The office is closed",
        "He always works at home",
        "Right now, he ___ lunch.",
        "is cooking",
        "cooks every day",
        "Compara tres hábitos con lo que ocurre hoy."
      ],
      [
        "Invitaciones y actividades del fin de semana",
        "Would you like to + verbo invita con cortesía. Let’s + verbo propone una actividad. Acepta o rechaza con amabilidad y una razón.",
        "Would you like to play? — I’d love to. Let’s meet at four.",
        "Sara invites Omar to watch a movie on Saturday. He cannot go because he works that evening. They agree to meet on Sunday afternoon instead.",
        "¿Cuándo acuerdan reunirse?",
        "Sunday afternoon",
        "Saturday evening",
        "Let’s ___ at four.",
        "meet",
        "to meet",
        "Invita, responde y acuerda una alternativa si es necesario."
      ]
    ]
  },

  // NIVEL 5
  {
    title: "Food and Social Life",

    sounds: [
      [
        "food",
        "/fuːd/",
        "FÚUD",
        "Una sílaba. Mantén la u y termina sin añadir una vocal."
      ],
      [
        "would",
        "/wʊd/",
        "uud (aprox.)",
        "La l no se pronuncia. /ʊ/ es una vocal corta, no una u española exacta."
      ]
    ],

    topics: [
      [
        "Alimentos y hábitos",
        "Los contables admiten número: two apples. Los incontables suelen usar cantidades o recipientes: some rice, a glass of water.",
        "I eat an apple. We have rice and a glass of water.",
        "For breakfast, Rosa has two eggs and a glass of milk. For lunch, she eats rice, beans and chicken. She likes apples as a snack.",
        "¿Qué bebe Rosa en el desayuno?",
        "Milk",
        "Coffee",
        "I eat two ___.",
        "apples",
        "rices",
        "Describe tus comidas habituales y distingue contables e incontables."
      ],
      [
        "Lo que tenemos y necesitamos",
        "Some suele usarse en afirmaciones; any en negativas y preguntas generales. A lot of funciona con contables e incontables.",
        "We have some rice. We don’t have any eggs. There is a lot of water.",
        "We have some rice and a lot of beans at home. We don’t have any eggs. Before dinner, we need to buy eggs and some tomatoes.",
        "¿Qué alimento falta en casa?",
        "Eggs",
        "Rice",
        "We don’t have ___ eggs.",
        "any",
        "some of",
        "Explica qué alimentos hay y cuáles hace falta comprar."
      ],
      [
        "Compras y cantidades",
        "Many y a few acompañan contables; much y a little, incontables. Pregunta How many apples? y How much milk?",
        "We need a few apples and a little milk. How much is the bread?",
        "The shopping list has six apples, a little milk and two bags of rice. We have only a few tomatoes, so we will buy four more.",
        "¿Cuántas manzanas hay en la lista?",
        "Six",
        "Four",
        "How ___ apples do we need?",
        "many",
        "much",
        "Prepara una lista y pregunta por cantidades y precios."
      ],
      [
        "En un restaurante",
        "I’d like significa I would like. Usa I’d like + alimento y Could I have…? para pedir con cortesía.",
        "I’d like the chicken, please. Could I have some water?",
        "At the restaurant, Luis orders chicken with rice. He asks for water without ice. His friend orders soup. They ask for the bill after lunch.",
        "¿Cómo pide Luis el agua?",
        "Without ice",
        "With ice",
        "I ___ like the chicken, please.",
        "would",
        "am",
        "Representa un pedido completo y pide la cuenta con cortesía."
      ],
      [
        "Lugares para salir",
        "Usa lugares y frecuencia para describir tu vida social: café, park, museum, restaurant. Once a week = una vez por semana.",
        "We go to the park once a week. I rarely visit museums.",
        "Eva meets her friends at a café every Friday. Once a month, they visit a museum. They rarely go to expensive restaurants because they want to save money.",
        "¿Con qué frecuencia visitan un museo?",
        "Once a month",
        "Every Friday",
        "We visit a museum once ___ month.",
        "a",
        "in",
        "Sugiere un lugar y explica con qué frecuencia vas."
      ],
      [
        "Organizar una actividad social",
        "Propón con Let’s… / How about + ing? Acepta con That sounds good. Rechaza con una razón y ofrece otra opción.",
        "How about having a picnic? — That sounds good. Let’s bring fruit.",
        "Our group wants to have a picnic. Saturday is not possible because two people work. We choose Sunday morning. Everyone agrees to bring food to share.",
        "¿Por qué no eligen el sábado?",
        "Two people work",
        "The park is closed",
        "How about ___ a picnic?",
        "having",
        "have",
        "Acuerden lugar, hora, comida y responsabilidades para una salida."
      ]
    ]
  },

  // NIVEL 6
  {
    title: "Past Experiences",

    sounds: [
      [
        "worked",
        "/wɜrkt/",
        "uérkt (aprox.)",
        "La terminación ed suena /t/; no es una sílaba adicional."
      ],
      [
        "wanted",
        "/ˈwɑntɪd/",
        "UÁN-tid",
        "Después de /t/ o /d/, ed añade la sílaba /ɪd/."
      ]
    ],

    topics: [
      [
        "Ayer y el fin de semana pasado",
        "Pasado de be: I/he/she/it was; you/we/they were. Negativos: wasn’t y weren’t. Usa yesterday y last weekend.",
        "I was at home yesterday. They were tired last night.",
        "Last Saturday, I was at my grandmother’s house. My cousins were there too. We were happy to see her. On Sunday, I was at home.",
        "¿Dónde estaba el narrador el sábado?",
        "At the grandmother’s house",
        "At home",
        "They ___ happy yesterday.",
        "were",
        "was",
        "Describe dónde estabas y cómo te sentías el fin de semana pasado."
      ],
      [
        "Acciones regulares en pasado",
        "Añade ed a verbos regulares: work → worked. Con consonante + y: study → studied. Ed suena /t/, /d/ o /ɪd/: worked, played, wanted.",
        "Yesterday I worked, played soccer and visited my aunt.",
        "Yesterday, Paula cleaned her room and studied English. In the afternoon, she visited her aunt. They cooked dinner together and watched a movie.",
        "¿A quién visitó Paula?",
        "Her aunt",
        "Her teacher",
        "Yesterday she ___ English.",
        "studied",
        "study",
        "Explica cinco acciones de ayer y practica las terminaciones ed."
      ],
      [
        "Verbos irregulares frecuentes",
        "Algunos verbos cambian: go/went, have/had, see/saw, eat/ate, make/made, get/got. Aprende la forma en una frase.",
        "We went to the beach. I ate fish and saw a boat.",
        "On my birthday, we went to Granada. We had lunch near the park. I ate chicken and saw an old friend. My mother made a cake that evening.",
        "¿Qué preparó la madre?",
        "A cake",
        "Fish",
        "We ___ to Granada yesterday.",
        "went",
        "goed",
        "Cuenta un día memorable usando al menos cuatro verbos irregulares."
      ],
      [
        "Experiencias negativas en pasado",
        "Usa didn’t + verbo base. No repitas el pasado: didn’t go, no didn’t went. Compara lo ocurrido con lo que no ocurrió.",
        "I visited León, but I didn’t go to the beach.",
        "We planned a beach trip, but it rained. We didn’t go to the beach. We stayed home and cooked. We didn’t watch TV because we played games together.",
        "¿Por qué no fueron a la playa?",
        "It rained",
        "They had to work",
        "We didn’t ___ to the beach.",
        "go",
        "went",
        "Explica tres cosas que hiciste y tres que no hiciste."
      ],
      [
        "Preguntas sobre el pasado",
        "Usa Did + sujeto + verbo base. Responde Yes, I did / No, I didn’t. Para be, usa Was/Were directamente.",
        "Did you travel? — Yes, I did. Were you tired? — No, I wasn’t.",
        "Ana asks Joel about Sunday. He visited his uncle and helped in the garden. He didn’t travel far. He returned home before dinner.",
        "¿Qué hizo Joel con su tío?",
        "Helped in the garden",
        "Watched a movie",
        "Did she ___ her uncle?",
        "visit",
        "visited",
        "Entrevista a alguien sobre una experiencia pasada con preguntas adicionales."
      ],
      [
        "Una historia completa",
        "Ordena con first, then, after that y finally. Because explica causas. Mantén los verbos en pasado cuando relates hechos terminados.",
        "First, we arrived. Then, we ate because we were hungry. Finally, we went home.",
        "First, we took a bus to the lake. Then, we walked along the shore. After that, we ate because we were hungry. Finally, we returned home before sunset.",
        "¿Qué hicieron antes de comer?",
        "Walked along the shore",
        "Returned home",
        "We ate ___ we were hungry.",
        "because",
        "finally",
        "Cuenta una historia de 2–3 minutos con inicio, secuencia y cierre."
      ]
    ]
  },

  // NIVEL 7
  {
    title: "Future Plans",

    sounds: [
      [
        "going",
        "/ˈɡoʊɪŋ/",
        "GÓU-ing",
        "En /ŋ/ no añadas una g final separada."
      ],
      [
        "will",
        "/wɪl/",
        "uil (aprox.)",
        "/ɪ/ es breve y relajada; no equivale exactamente a la i española."
      ]
    ],

    topics: [
      [
        "Metas personales",
        "Usa am/is/are going to + verbo para intenciones. Para negar, añade not después de be.",
        "I’m going to study nursing. I’m not going to stop learning English.",
        "Lucía is going to finish school this year. She is going to study nursing next year. She is not going to leave her English course because it supports her goals.",
        "¿Qué quiere estudiar Lucía?",
        "Nursing",
        "Engineering",
        "She is going to ___ nursing.",
        "study",
        "studies",
        "Explica tres metas personales, académicas o laborales."
      ],
      [
        "Planes de fin de semana y vacaciones",
        "Pregunta con be + sujeto + going to + verbo. Respuestas cortas: Yes, I am / No, she isn’t.",
        "Are you going to travel? Where are you going to stay?",
        "We are going to visit Ometepe next month. We are going to stay with relatives for three days. We are not going to rent a car; we will use local transport.",
        "¿Dónde van a hospedarse?",
        "With relatives",
        "At a hotel",
        "___ you going to travel?",
        "Are",
        "Do",
        "Pregunta y responde sobre un plan de vacaciones."
      ],
      [
        "Predicciones y decisiones",
        "Will + verbo base expresa predicciones y decisiones tomadas al momento. Negativo: won’t. No añadas s al verbo después de will.",
        "I think it will rain. The phone is ringing; I’ll answer it.",
        "The sky is getting dark. Mateo thinks it will rain soon. His friend cannot find an umbrella. Mateo says, “I’ll lend you mine.” They decide to leave before the storm.",
        "¿Qué ofrece Mateo?",
        "His umbrella",
        "A ride tomorrow",
        "I think it ___ rain.",
        "will",
        "is will",
        "Haz dos predicciones y responde a dos situaciones con decisiones espontáneas."
      ],
      [
        "Acuerdos futuros",
        "Present Continuous puede expresar acuerdos futuros confirmados, especialmente con hora o fecha. Usa am/is/are + ing y contexto futuro.",
        "I’m meeting the dentist tomorrow at nine.",
        "I’m meeting Carla tomorrow at ten. We booked a table at a café to plan our project. After lunch, she is visiting her doctor; her appointment is at two.",
        "¿A qué hora es la cita médica de Carla?",
        "At two",
        "At ten",
        "I ___ Carla tomorrow at ten.",
        "am meeting",
        "meeting",
        "Explica tres compromisos futuros confirmados."
      ],
      [
        "Invitaciones y cambios",
        "Para cambiar un acuerdo usa Could we meet…? o Can we move it to…? Da una razón y confirma la nueva hora.",
        "Could we meet on Sunday instead? — Yes, Sunday works for me.",
        "Leo and Sara planned to meet on Friday. Sara has an exam, so she asks to move the meeting to Saturday at three. Leo agrees and writes the new time in his calendar.",
        "¿Por qué cambian la reunión?",
        "Sara has an exam",
        "Leo is traveling",
        "Could we ___ on Saturday?",
        "meet",
        "meeting",
        "Invita a alguien y negocia un cambio de fecha con una razón."
      ],
      [
        "Planificar una actividad real",
        "Combina going to para intenciones, will para decisiones/predicciones y Present Continuous para acuerdos confirmados.",
        "We’re going to organize a fair. We’re meeting the team tomorrow. I’ll bring paper.",
        "Our group is going to organize a clean-up day. We’re meeting the community leader on Tuesday at four; the appointment is confirmed. Ana volunteers, “I’ll bring the bags.” We think many neighbors will help.",
        "¿Qué llevará Ana?",
        "Bags",
        "Food",
        "We’re ___ the leader on Tuesday.",
        "meeting",
        "meet",
        "Presenta un plan con objetivo, horario, responsabilidades y alternativa."
      ]
    ]
  },

  // NIVEL 8
  {
    title: "Comparisons and Recommendations",

    sounds: [
      [
        "cheaper",
        "/ˈtʃiːpər/",
        "CHÍ-per",
        "Primera sílaba fuerte. Mantén la i y suaviza la última sílaba."
      ],
      [
        "enough",
        "/ɪˈnʌf/",
        "i-NÁF",
        "Gh suena /f/. /ʌ/ no es una a española exacta."
      ]
    ],

    topics: [
      [
        "Describir personas y lugares",
        "Amplía descripciones con adjetivos. Orden inicial útil: opinión + tamaño + sustantivo. No pongas s a los adjetivos.",
        "It is a beautiful small town. She is a friendly, patient teacher.",
        "San Pedro is a quiet small town near a lake. It has colorful houses and a busy market. The central park is clean and shady. Many families visit it on weekends.",
        "¿Qué lugar tiene sombra?",
        "The central park",
        "The busy market",
        "It is a ___ town.",
        "beautiful small",
        "small beautiful",
        "Describe una persona y un lugar con detalles precisos."
      ],
      [
        "Comparar dos opciones",
        "Adjetivos cortos suelen usar er + than; largos, more + adjetivo + than. Good → better; bad → worse.",
        "This bag is cheaper than that one. The bus is more comfortable than the van.",
        "The bus costs twenty dollars and the train costs thirty. The train is faster, but the bus stop is closer to our house. We choose the bus to save money.",
        "¿Por qué eligen el bus?",
        "To save money",
        "Because it is faster",
        "This bag is cheaper ___ that one.",
        "than",
        "that",
        "Compara dos productos, personas o lugares con cuatro diferencias."
      ],
      [
        "La mejor y la peor opción",
        "Usa the + est o the most + adjetivo. Good → the best; bad → the worst. In suele introducir lugar o grupo singular.",
        "It is the cheapest hotel in town. This is the best option.",
        "Three hotels are available. Hotel A is the cheapest, but it is far from the center. Hotel B is the closest. Hotel C has the largest rooms. We choose B because location matters most.",
        "¿Cuál está más cerca?",
        "Hotel B",
        "Hotel A",
        "This is ___ best option.",
        "the",
        "a",
        "Clasifica tres opciones y explica tu elección."
      ],
      [
        "Adecuación y limitaciones",
        "Too + adjetivo indica exceso. Adjetivo + enough indica suficiencia. Enough + sustantivo: enough money.",
        "The bag is too heavy. This room is large enough. We have enough money.",
        "The first room is too small for twelve students. The second room is large enough, but it has no windows. The third has enough chairs and good ventilation, so we choose it.",
        "¿Por qué no sirve el primer salón?",
        "It is too small",
        "It has no windows",
        "The room is large ___.",
        "enough",
        "too",
        "Explica por qué tres opciones son adecuadas o inadecuadas."
      ],
      [
        "Agregar información",
        "Who describe personas; which, cosas; where, lugares. Una cláusula relativa añade información sobre un sustantivo.",
        "A teacher is a person who helps students. This is the park where we meet.",
        "Our guide is a woman who knows the town well. She shows us a market where local artists sell their work. I buy a bag which is made from recycled material.",
        "¿Qué vende el mercado descrito?",
        "Local artists’ work",
        "Only imported food",
        "A guide is someone ___ helps visitors.",
        "who",
        "where",
        "Describe dos personas, dos objetos y dos lugares con cláusulas relativas."
      ],
      [
        "Recomendaciones con fundamento",
        "Compara opciones y recomienda usando should, because y evidencia. Una buena recomendación explica para quién resulta útil.",
        "You should choose the bus because it is cheaper and stops near your home.",
        "Two phones are available. Phone A has a better camera, but Phone B costs less and has a longer battery life. Rosa needs a phone for work calls, not photography. We recommend B because it meets her needs at a lower price.",
        "¿Por qué recomiendan B a Rosa?",
        "It fits her needs and costs less",
        "It has the best camera",
        "You should ___ Phone B.",
        "choose",
        "chooses",
        "Compara dos opciones y defiende una recomendación con tres razones."
      ]
    ]
  },

  // NIVEL 9
  {
    title: "Life Experiences and Opinions",

    sounds: [
      [
        "been",
        "/bɪn/",
        "bin (aprox.)",
        "Una pronunciación estadounidense frecuente; /ɪ/ es corta y relajada."
      ],
      [
        "ever",
        "/ˈevər/",
        "É-ver",
        "Primera sílaba fuerte. /v/: dientes superiores sobre labio inferior, con vibración."
      ]
    ],

    topics: [
      [
        "Experiencias de vida",
        "Present Perfect: have/has + participio. Negativo: haven’t/hasn’t. Conecta experiencias con el presente sin indicar una fecha pasada terminada.",
        "I have visited León. She hasn’t traveled abroad.",
        "Marta has visited several cities in Nicaragua. She has tried kayaking, but she hasn’t traveled abroad. Her brother has worked in Costa Rica and has learned a lot from the experience.",
        "¿Qué NO ha hecho Marta?",
        "Traveled abroad",
        "Tried kayaking",
        "She ___ visited León.",
        "has",
        "have",
        "Explica experiencias que has tenido y otras que aún no has tenido."
      ],
      [
        "Entrevistas sobre experiencias",
        "Have you ever + participio pregunta si algo ha ocurrido alguna vez. Never va entre have/has y participio. Para detalles terminados, cambia a Past Simple.",
        "Have you ever camped? — Yes, I have. Where did you go?",
        "Joel has never camped, but he has climbed a volcano. He climbed Mombacho last year with his cousins. He says the walk was difficult, but the view was worth the effort.",
        "¿Qué experiencia ha tenido Joel?",
        "Climbing a volcano",
        "Camping",
        "Have you ever ___ a volcano?",
        "climbed",
        "climb",
        "Haz una entrevista con Have you ever…? y preguntas sobre detalles."
      ],
      [
        "Acciones recientes",
        "Already indica que algo ya ocurrió; yet se usa en preguntas y negativas; just expresa una acción muy reciente.",
        "I’ve just arrived. She has already eaten. Have you finished yet?",
        "Our team has just arrived at the station. Ana has already bought the tickets, but Joel hasn’t found his bag yet. The train leaves in twenty minutes, so we help him look for it.",
        "¿Qué ha hecho Ana?",
        "Bought the tickets",
        "Found Joel’s bag",
        "He hasn’t found his bag ___.",
        "yet",
        "already never",
        "Da tres actualizaciones usando just, already y yet."
      ],
      [
        "Duración: since y for",
        "Usa since con punto inicial y for con período. Present Perfect conecta una situación iniciada antes con el presente.",
        "I have lived here since 2020. She has studied English for two years.",
        "Daniel has lived in Masaya since 2020. He has worked at the same store for three years. He still enjoys his job because he meets different people every day.",
        "¿Sigue trabajando Daniel en la tienda?",
        "Yes",
        "No",
        "I have lived here ___ 2020.",
        "since",
        "for",
        "Explica cuánto tiempo han durado tres situaciones que continúan."
      ],
      [
        "Experiencia y tiempo terminado",
        "Present Perfect introduce experiencia sin fecha terminada. Past Simple da detalles con yesterday, last year o una fecha pasada.",
        "I have visited Granada. I went there last month.",
        "I have seen that band twice. I first saw them in 2022 at a festival. Last month, I attended another concert with my sister. Both shows were excellent, but the second venue was smaller.",
        "¿Con quién fue al concierto del mes pasado?",
        "With the sister",
        "With the band",
        "I ___ there last month.",
        "went",
        "have gone",
        "Presenta una experiencia y amplía con cuándo, dónde y con quién."
      ],
      [
        "Opiniones con apoyo",
        "Presenta tu postura con I think/I believe. Apóyala con because y for example. However introduce un contraste.",
        "I think libraries matter because they offer access to information. However, they need funding.",
        "I believe community libraries are important because not everyone can buy books. For example, students can borrow materials and use quiet study spaces. However, libraries need reliable funding. Local businesses could help by supporting reading events.",
        "¿Qué dificultad menciona el texto?",
        "Libraries need reliable funding",
        "Students cannot borrow books",
        "Libraries matter ___ they support learning.",
        "because",
        "however",
        "Defiende una opinión con una razón, un ejemplo y una limitación."
      ]
    ]
  },

  // NIVEL 10
  {
    title: "Problems and Solutions",

    sounds: [
      [
        "should",
        "/ʃʊd/",
        "shud (aprox.)",
        "La l es muda. /ʃ/ es aire continuo; no es ch."
      ],
      [
        "might",
        "/maɪt/",
        "MÁIT",
        "Gh no se pronuncia; termina en t sin una vocal adicional."
      ]
    ],

    topics: [
      [
        "Dar consejos",
        "Should/shouldn’t + verbo base da consejos; could propone una opción. No uses to después de estos modales.",
        "You should rest. You could ask for help. You shouldn’t skip meals.",
        "Ana is tired because she sleeps only five hours a night. Her friend suggests a regular bedtime and less screen time before bed. Ana decides to try the routine for a week before judging whether it helps.",
        "¿Por cuánto tiempo probará Ana la rutina?",
        "A week",
        "A month",
        "You should ___ more.",
        "rest",
        "to rest",
        "Da consejos y alternativas para tres problemas cotidianos."
      ],
      [
        "Reglas y responsabilidades",
        "Must/have to expresan obligación. Mustn’t expresa prohibición; don’t have to significa que no es obligatorio. No son equivalentes.",
        "You must wear an ID. You mustn’t smoke. You don’t have to bring lunch.",
        "At the workshop, visitors must wear safety glasses. They mustn’t enter the storage room. Lunch is provided, so they don’t have to bring food. The organizer explains these rules before the tour begins.",
        "¿Es obligatorio llevar comida?",
        "No, lunch is provided",
        "Yes, food is required",
        "You ___ enter. It is prohibited.",
        "mustn’t",
        "don’t have to",
        "Explica obligaciones, prohibiciones y opciones de una escuela o trabajo."
      ],
      [
        "Posibilidades",
        "May, might y could + verbo base expresan posibilidades. No aseguran que algo sea cierto. Distingue lo confirmado de lo posible.",
        "The bus might be late. The problem could be the battery.",
        "The classroom projector will not turn on. It might be unplugged, or the cable could be damaged. The teacher checks the connection before calling a technician. The cause is not confirmed yet.",
        "¿Qué está confirmado sobre la causa?",
        "Nothing yet",
        "The cable is definitely damaged",
        "The cable might ___ damaged.",
        "be",
        "is",
        "Propón posibles causas y soluciones sin presentarlas como hechos."
      ],
      [
        "Hechos y consecuencias generales",
        "Zero conditional: if + Present Simple, Present Simple. Describe resultados generales. Si la condición va primero, separa con coma.",
        "If you heat ice, it melts. If students need help, the teacher explains again.",
        "Our library has a clear system. If a reader returns a book late, the system records the delay. If a book is damaged, a staff member checks it. These rules help the library keep materials available for everyone.",
        "¿Qué ocurre si devuelven un libro tarde?",
        "The system records the delay",
        "The library closes",
        "If you heat ice, it ___.",
        "melts",
        "will melted",
        "Explica tres reglas generales de causa y efecto."
      ],
      [
        "Situaciones futuras posibles",
        "First conditional: if + Present Simple, will + verbo base. No uses will en la condición básica con if.",
        "If it rains tomorrow, we will move the event indoors.",
        "The school is planning an outdoor fair tomorrow. If it rains, the team will use the main hall. If the weather stays dry, the activities will remain in the garden. Volunteers will check the forecast tonight.",
        "¿Dónde harán la feria si llueve?",
        "In the main hall",
        "In the garden",
        "If it ___ tomorrow, we will stay inside.",
        "rains",
        "will rain",
        "Explica consecuencias probables de tres decisiones futuras."
      ],
      [
        "Resolver un problema real",
        "Propón soluciones, expresa acuerdo o desacuerdo respetuoso y negocia. Usa I agree, I see your point, but… y Could we…?",
        "I see your point, but that may cost too much. Could we try a cheaper option?",
        "The team has a small budget for a class event. One member wants a restaurant meal; another suggests a picnic. They compare costs and agree on a picnic with shared food. If it rains, they will use a classroom instead.",
        "¿Por qué eligen un picnic?",
        "It fits the small budget",
        "The restaurant is free",
        "If it rains, we ___ use a classroom.",
        "will",
        "would have",
        "Analiza un problema, compara soluciones y acuerda un compromiso."
      ]
    ]
  },

  // NIVEL 11
  {
    title: "Connected Communication",

    sounds: [
      [
        "while",
        "/waɪl/",
        "UÁIL",
        "Una sílaba. Desliza a hacia i y termina en l."
      ],
      [
        "said",
        "/sed/",
        "SED",
        "La vocal es /e/; no se pronuncia como say."
      ]
    ],

    topics: [
      [
        "Acciones en progreso en el pasado",
        "Past Continuous: was/were + verbo ing. Describe lo que estaba ocurriendo a una hora pasada. Negativo: wasn’t/weren’t + ing.",
        "At eight, I was studying. They weren’t watching TV.",
        "At eight last night, Carla was preparing a presentation. Her brother was cooking, and their parents were talking outside. Nobody was watching television. The house was busy, but Carla found a quiet corner to work.",
        "¿Qué estaba haciendo el hermano?",
        "Cooking",
        "Watching television",
        "They ___ cooking at eight.",
        "were",
        "was",
        "Describe qué hacían varias personas a una hora del pasado."
      ],
      [
        "Eventos interrumpidos",
        "Past Continuous da el fondo; Past Simple introduce un evento terminado. When suele introducir la interrupción; while, la actividad en progreso.",
        "I was walking home when it started to rain.",
        "We were walking to the station when the rain started. While we were waiting under a roof, a neighbor offered us a ride. We accepted and reached the station just before the bus left.",
        "¿Qué ocurrió mientras esperaban bajo techo?",
        "A neighbor offered a ride",
        "The bus arrived at their house",
        "I was walking when it ___ to rain.",
        "started",
        "was start",
        "Cuenta una situación con fondo, interrupción y resultado."
      ],
      [
        "Situaciones imaginarias",
        "Second conditional: if + Past Simple, would + verbo base. Expresa situaciones hipotéticas. If I were you es una fórmula común de consejo.",
        "If I had more time, I would learn another language.",
        "If I owned a community center, I would offer free evening classes. I would also create a reading room. My friend says she would organize sports activities. We do not own a center, but imagining one helps us discuss community needs.",
        "¿Tienen ya un centro comunitario?",
        "No, it is hypothetical",
        "Yes, it is open",
        "If I had time, I ___ volunteer.",
        "would",
        "will definitely",
        "Discute tres situaciones imaginarias y sus consecuencias."
      ],
      [
        "Reportar información",
        "Introducción: said + oración; told + persona + oración. En reportes desde un momento posterior suele cambiar el tiempo: am → was. Ajusta pronombres al contexto.",
        "Ana said, “I am tired.” → Later, Leo said that Ana was tired.",
        "On Monday, Ana told Leo, “I am busy today.” On Tuesday, Leo reported that Ana had said she was busy on Monday. He did not assume that she was still busy on Tuesday, so he contacted her again.",
        "¿Por qué contactó Leo otra vez a Ana?",
        "Her Monday situation might have changed",
        "She had never spoken to him",
        "Ana said that she ___ tired. (Reporte posterior)",
        "was",
        "am",
        "Reporta tres mensajes sencillos y aclara quién dijo cada cosa."
      ],
      [
        "Interacción natural",
        "Usa reacciones, pausas y aclaraciones: Really? Let me think. What do you mean? Could you say that again? Añade preguntas de seguimiento relacionadas.",
        "That sounds interesting. How did you get involved?",
        "During a conversation, Joel does not understand the word “volunteer.” He asks, “What do you mean by volunteer?” His partner explains and gives an example. Joel then asks how she joined the project, keeping the conversation going.",
        "¿Qué hace Joel después de la explicación?",
        "Asks a follow-up question",
        "Ends the conversation",
        "Could you ___ that again?",
        "say",
        "said",
        "Mantén una conversación con una aclaración, dos reacciones y tres preguntas adicionales."
      ],
      [
        "Historias y perspectivas",
        "Integra tiempos narrativos, información reportada y reacciones. Diferencia lo que viste de lo que otra persona afirmó.",
        "I was waiting when the lights went out. Ana said she was worried.",
        "I was helping at a school event when the lights went out. I saw teachers guide students toward the windows. Later, Ana said she had felt worried, while Joel described the group as calm. Their different reactions reminded me that people can experience the same event differently.",
        "¿Qué observó directamente el narrador?",
        "Teachers guiding students",
        "Ana’s private thoughts",
        "I was helping when the lights ___ out.",
        "went",
        "were go",
        "Narra un evento, reporta otra perspectiva y explica tu reacción."
      ]
    ]
  },

  // NIVEL 12
  {
    title: "Real World English Capstone",

    sounds: [
      [
        "experience",
        "/ɪkˈspɪriəns/",
        "ik-SPÍ-ri-ens",
        "La sílaba fuerte es /spɪr/. No añadas una e antes de sp."
      ],
      [
        "could",
        "/kʊd/",
        "kud (aprox.)",
        "La l es muda; /ʊ/ es corta y relajada."
      ]
    ],

    topics: [
      [
        "Presentación profesional",
        "Organiza perfil, habilidades, experiencia y metas. Can + verbo expresa habilidad; have worked/studied conecta experiencia con el presente.",
        "I can assist customers. I have worked in sales. I’m going to improve my English.",
        "My name is Rosa, and I am interested in customer service. I have worked in a small store for two years, where I help customers and organize orders. I can use spreadsheets and solve routine problems. I am studying English because I want to support international customers in the future.",
        "¿Por qué estudia inglés Rosa?",
        "To support international customers",
        "To stop working in sales immediately",
        "I can ___ customers.",
        "assist",
        "to assist",
        "Presenta tu perfil, dos habilidades, experiencia y una meta profesional."
      ],
      [
        "Entrevistas laborales y académicas",
        "Desarrolla respuestas con una idea, evidencia y resultado. Usa presente para habilidades y pasado para ejemplos específicos. Pide aclaración si hace falta.",
        "I am organized. Last month, I planned an event and finished every task on time.",
        "In an interview, Diego is asked about teamwork. He explains that he helped organize a school fair last year. When a volunteer canceled, he redistributed tasks and informed the group. The fair opened on time. Instead of only saying he is responsible, he gives a concrete example that supports his claim.",
        "¿Cómo demuestra responsabilidad Diego?",
        "By describing a specific past action",
        "By refusing to discuss examples",
        "Last year, I ___ a school fair.",
        "organized",
        "have organize",
        "Responde cinco preguntas de entrevista con ejemplos y preguntas de seguimiento."
      ],
      [
        "Viajes y servicios",
        "Usa peticiones corteses y describe el problema con precisión. Could you…? pide ayuda. Confirm details significa comprobar que ambos entendieron lo mismo.",
        "Could you check my reservation? I booked a quiet room, but this one is very noisy.",
        "At a hotel, Sara discovers that her room is beside a noisy elevator. She explains that she requested a quiet room when she booked. Rather than arguing, she asks whether another room is available. The receptionist offers a room on a different floor. Sara confirms that there is no additional charge before accepting.",
        "¿Qué confirma Sara antes de aceptar?",
        "There is no additional charge",
        "The elevator will be removed",
        "Could you ___ my reservation?",
        "check",
        "checked",
        "Resuelve un problema de hotel, transporte o servicio con cortesía y confirmación."
      ],
      [
        "Noticias e información",
        "Introducción a voz pasiva: be + participio. El sujeto recibe la acción. Para resumir, identifica qué ocurrió, dónde y la idea principal sin inventar detalles.",
        "Volunteers cleaned the park. → The park was cleaned by volunteers.",
        "A new reading room was opened at the community center on Saturday. The project was supported by local businesses and volunteers. Books were donated by families, and tables were built by a local carpenter. Organizers say the room will offer free reading activities twice a week. The report does not state how many people will attend.",
        "¿Qué dato NO proporciona la noticia?",
        "How many people will attend",
        "Who donated books",
        "The books ___ donated by families.",
        "were",
        "was",
        "Resume una noticia breve y distingue datos confirmados de información ausente."
      ],
      [
        "Opiniones y debate respetuoso",
        "Presenta postura, evidencia y respuesta a una objeción. Usa I understand your point; however… Evita tratar una opinión como un hecho demostrado.",
        "I support the idea because… I understand your concern; however, we could…",
        "A school is considering a weekly study club. Supporters argue that it would provide a quiet space for students who cannot study comfortably at home. Others worry about transport costs after school. One proposal is to hold the club before regular classes. The group agrees to ask students about their schedules before making a final decision.",
        "¿Qué acuerdan hacer antes de decidir?",
        "Ask students about their schedules",
        "Start the club immediately",
        "I understand your point; ___, transport is a concern.",
        "however",
        "because of",
        "Defiende una postura, responde una objeción y reconoce una limitación."
      ],
      [
        "Preparación del proyecto B1",
        "Organiza introducción, ideas con evidencia y conclusión. Integra tiempos y vocabulario según el mensaje. Prepárate para responder preguntas sin memorizar todo.",
        "Our project addresses… We interviewed… We recommend… If we receive support, we will…",
        "Our team investigated how to reduce waste at school. We interviewed students and observed the lunch area for a week. Many students said that recycling bins were difficult to find. We recommend clearly labeled bins near the cafeteria and a short information campaign. If the school approves a trial, we will compare waste levels before and after it. The proposal still needs permission and funding.",
        "¿Cómo evaluarían el ensayo propuesto?",
        "By comparing waste before and after",
        "By counting presentation slides",
        "If the school approves, we ___ compare results.",
        "will",
        "would have",
        "Ensaya una presentación independiente con problema, evidencia, propuesta y preguntas."
      ]
    ]
  }
];
