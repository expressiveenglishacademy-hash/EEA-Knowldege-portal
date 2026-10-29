// app.js - Plataforma Oficial EEA con Navegación Fluida (100% Sin Alertas ni Pop-outs)
(function () {
  'use strict';

  const app = document.getElementById('app');
  if (!app) return;

  let activeTab = 'courses'; // 'courses' | 'flashcards' | 'phonetics'
  let activeLevelIdx = 0;
  let activeTopicIdx = null; // null = lista de temas; número = pantalla completa de estudio
  let activeTopicSection = 'rule'; // 'rule' | 'reading' | 'grammar' | 'speaking'

  let currentReadingAnswer = null;
  let currentReadingChecked = false;
  let currentGrammarAnswer = null;
  let currentGrammarChecked = false;
  let isRecording = false;
  let recordSeconds = 0;
  let recordTimer = null;
  let hasRecorded = false;

  let currentCardIdx = 0;
  let isCardFlipped = false;
  const sampleCards = [
    { en: 'Nice to meet you', es: 'Mucho gusto / Encantado de conocerte', ipa: '/naɪs tuː miːt juː/' },
    { en: 'How do you spell your name?', es: '¿Cómo se deletrea tu nombre?', ipa: '/haʊ duː juː spɛl jʊər neɪm/' },
    { en: 'Where are you from?', es: '¿De dónde sos / eres?', ipa: '/wɛər ɑːr juː frɒm/' },
    { en: 'I am nineteen years old', es: 'Tengo 19 años (en inglés se usa verbo Be)', ipa: '/aɪ æm ˌnaɪnˈtiːn jɪərz oʊld/' },
    { en: 'What time does the class start?', es: '¿A qué hora empieza la clase?', ipa: '/wɒt taɪm dʌz ðə klɑːs stɑːrt/' },
    { en: 'Could you please repeat that?', es: '¿Podrías repetir eso, por favor?', ipa: '/kʊd juː pliːz rɪˈpiːt ðæt/' },
    { en: 'I am looking forward to it', es: 'Lo espero con entusiasmo / muchas ganas', ipa: '/aɪ æm ˈlʊkɪŋ ˈfɔːrwərd tuː ɪt/' },
    { en: 'Fluency over accuracy', es: 'Priorizá la fluidez y comunicación sobre el miedo a fallar', ipa: '/ˈfluːənsi ˈoʊvər ˈækjərəsi/' }
  ];

  let completedTopics = {};
  try {
    completedTopics = JSON.parse(localStorage.getItem('eea_completed_topics') || '{}');
  } catch (e) {}

  let deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    render();
  });

  function saveProgress() {
    try {
      localStorage.setItem('eea_completed_topics', JSON.stringify(completedTopics));
    } catch (e) {}
  }

  function speak(text, rate = 0.9) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }

  function render() {
    const levels = window.EEA || [];
    const currentLevel = levels[activeLevelIdx] || { title: 'Nivel 1', topics: [], sounds: [] };

    let html = `
      <!-- Header Superior -->
      <header class="sticky top-0 z-40 bg-[#153958] text-white shadow-md border-b border-[#20486c]">
        <div class="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <img src="LOGO%20EEA.jpg" alt="EEA" class="w-10 h-10 rounded-lg object-contain bg-white/10 p-0.5 border border-white/20" onerror="this.style.display='none'">
            <div>
              <span class="font-extrabold text-base tracking-tight text-white block leading-none">Expressive English</span>
              <p class="text-[11px] text-[#b9d9d0] hidden sm:block">Embrace the Extraordinary · Portal Oficial</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1 bg-[#1a4468] text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold">
              🔥 <span>3d racha</span>
            </div>
            ${deferredInstallPrompt ? `
              <button id="install-btn" class="flex items-center gap-1.5 bg-[#176951] hover:bg-[#10543f] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                📲 Instalar App
              </button>
            ` : `
              <button onclick="alert('En Chrome: menú de 3 puntos ⋮ ➔ Instalar aplicación.\\nEn iPhone Safari: Compartir ➔ Agregar a pantalla de inicio.')" class="flex items-center gap-1 bg-[#176951] hover:bg-[#10543f] text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-sm">
                📲 Instalar
              </button>
            `}
            <a href="login.html" class="text-xs bg-white/10 px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white">Salir</a>
          </div>
        </div>
      </header>

      <!-- Desktop Subnav -->
      <div class="hidden md:flex bg-white border-b border-slate-200 justify-center gap-4 py-2 text-xs font-bold">
        <button onclick="window.switchTab('courses')" class="px-4 py-2 rounded-lg transition ${activeTab === 'courses' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">📚 12 Niveles de Cursos</button>
        <button onclick="window.switchTab('flashcards')" class="px-4 py-2 rounded-lg transition ${activeTab === 'flashcards' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">⚡ Flashcards Rápidas</button>
        <button onclick="window.switchTab('phonetics')" class="px-4 py-2 rounded-lg transition ${activeTab === 'phonetics' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">🎧 Fonética & Audio</button>
      </div>

      <!-- Main Container -->
      <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-6 pb-24 md:pb-12">
    `;

    if (activeTab === 'courses') {
      if (activeTopicIdx !== null) {
        html += renderTopicDetails(currentLevel, activeTopicIdx);
      } else {
        html += renderCourses(levels, currentLevel);
      }
    } else if (activeTab === 'flashcards') {
      html += renderFlashcards();
    } else if (activeTab === 'phonetics') {
      html += renderPhonetics(levels);
    }

    html += `
      </main>

      <!-- Mobile Native Bottom Bar -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 shadow-lg flex justify-around items-center safe-bottom">
        <button onclick="window.switchTab('courses')" class="flex flex-col items-center ${activeTab === 'courses' ? 'text-[#176951] font-bold' : 'text-slate-500'}">
          <span class="text-xl">📚</span>
          <span class="text-[11px]">Cursos</span>
        </button>
        <button onclick="window.switchTab('flashcards')" class="flex flex-col items-center ${activeTab === 'flashcards' ? 'text-[#176951] font-bold' : 'text-slate-500'}">
          <span class="text-xl">⚡</span>
          <span class="text-[11px]">Flashcards</span>
        </button>
        <button onclick="window.switchTab('phonetics')" class="flex flex-col items-center ${activeTab === 'phonetics' ? 'text-[#176951] font-bold' : 'text-slate-500'}">
          <span class="text-xl">🎧</span>
          <span class="text-[11px]">Fonética</span>
        </button>
      </nav>
    `;

    app.innerHTML = html;

    const installBtn = document.getElementById('install-btn');
    if (installBtn && deferredInstallPrompt) {
      installBtn.onclick = () => {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt = null;
        render();
      };
    }
  }

  function renderCourses(levels, currentLevel) {
    const levelNum = activeLevelIdx + 1;
    let h = `
      <div class="space-y-6">
        <!-- Selector Horizontal de Niveles -->
        <div class="bg-white p-3 rounded-2xl border border-slate-200 overflow-x-auto flex gap-2">
    `;
    levels.forEach((lvl, i) => {
      const isSel = i === activeLevelIdx;
      h += `
        <button onclick="window.selectLevel(${i})" class="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition ${isSel ? 'bg-[#153958] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
          Nivel ${i + 1}
        </button>
      `;
    });
    h += `
        </div>

        <!-- Banner del Nivel -->
        <div class="bg-gradient-to-r from-[#153958] to-[#176951] text-white p-6 rounded-3xl shadow-md">
          <span class="text-xs uppercase tracking-widest text-[#b9d9d0] font-bold">Nivel Oficial ${levelNum} de 12</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold mt-1">${currentLevel.title || 'Me and My Identity'}</h1>
          <p class="text-xs text-slate-200 mt-2">6 temas interactivos con lectura, ejercicios de gramática y fonética americana.</p>
        </div>

        <!-- Sonidos Clave del Nivel -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-[#176951]">Sonidos Clave del Nivel ${levelNum}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    `;
    (currentLevel.sounds || []).forEach((s) => {
      h += `
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <strong class="text-sm font-bold text-slate-900">${s[0]}</strong>
            <span class="text-xs text-indigo-700 font-mono ml-2">${s[1]}</span>
            <p class="text-[11px] text-slate-500 mt-0.5">${s[3]}</p>
          </div>
          <button onclick="window.speakText('${s[0]}')" class="p-2 bg-[#153958] hover:bg-[#1e4a70] text-white rounded-lg transition" title="Escuchar pronunciación">🔊</button>
        </div>
      `;
    });
    h += `
          </div>
        </div>

        <!-- Lista de Temas -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-[#153958]">Temas de Estudio (Nivel ${levelNum})</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    `;
    (currentLevel.topics || []).forEach((top, tIdx) => {
      const topId = `l${levelNum}-t${tIdx + 1}`;
      const isDone = !!completedTopics[topId];
      h += `
        <div class="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#176951] shadow-xs space-y-3 flex flex-col justify-between transition group">
          <div>
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-[#176951] uppercase">Tema ${tIdx + 1}</span>
              ${isDone ? '<span class="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">✓ Completado</span>' : '<span class="text-slate-400">Pendiente</span>'}
            </div>
            <h4 class="font-bold text-slate-900 text-base mt-1 group-hover:text-[#176951] transition">${top[0]}</h4>
            <p class="text-xs text-slate-600 line-clamp-3 mt-1 leading-relaxed">${top[1]}</p>
          </div>

          <div class="pt-3 border-t border-slate-100 space-y-2">
            <div class="p-2 bg-[#f7f6ef] rounded-lg border-l-2 border-[#bb944c] flex items-center justify-between">
              <span class="text-[11px] text-slate-800 italic truncate">${top[2]}</span>
              <button onclick="window.speakText('${top[2].replace(/'/g, '')}')" class="text-xs text-[#bb944c] hover:underline font-bold ml-1">🔊</button>
            </div>

            <div class="flex items-center justify-between pt-1">
              <button onclick="window.toggleDone('${topId}')" class="text-xs font-semibold ${isDone ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'}">
                ${isDone ? '✓ Listo' : 'Marcar visto'}
              </button>
              <button onclick="window.openTopicInPage(${tIdx})" class="px-3.5 py-1.5 bg-[#176951] hover:bg-[#10543f] text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1">
                <span>Estudiar</span> →
              </button>
            </div>
          </div>
        </div>
      `;
    });
    h += `
          </div>
        </div>
      </div>
    `;
    return h;
  }

  // PANTALLA COMPLETA INTERACTIVA DEL TEMA (SIN POP-UPS)
  function renderTopicDetails(level, tIdx) {
    const top = level.topics[tIdx];
    if (!top) return '';
    const levelNum = activeLevelIdx + 1;
    const topId = `l${levelNum}-t${tIdx + 1}`;
    const isDone = !!completedTopics[topId];

    return `
      <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <!-- Navegación superior -->
        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
          <button onclick="window.closeTopic()" class="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition">
            ← Volver a los temas del Nivel ${levelNum}
          </button>
          <button onclick="window.toggleDone('${topId}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
            ${isDone ? '✓ Tema Completado' : 'Marcar como estudiado'}
          </button>
        </div>

        <div>
          <span class="text-xs font-bold text-[#176951] uppercase tracking-wider">Tema ${tIdx + 1} · Nivel ${levelNum}</span>
          <h2 class="text-2xl font-extrabold text-[#153958] mt-1">${top[0]}</h2>
        </div>

        <!-- Pestañas internas de estudio -->
        <div class="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          <button onclick="window.setSection('rule')" class="px-3 py-1.5 rounded-lg transition ${activeTopicSection === 'rule' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">1. Regla & Ejemplo</button>
          <button onclick="window.setSection('reading')" class="px-3 py-1.5 rounded-lg transition ${activeTopicSection === 'reading' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">2. Lectura & Quiz</button>
          <button onclick="window.setSection('grammar')" class="px-3 py-1.5 rounded-lg transition ${activeTopicSection === 'grammar' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">3. Práctica de Gramática</button>
          <button onclick="window.setSection('speaking')" class="px-3 py-1.5 rounded-lg transition ${activeTopicSection === 'speaking' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">4. Misión Oral</button>
        </div>

        <!-- 1. Regla & Ejemplo -->
        ${activeTopicSection === 'rule' ? `
          <div class="space-y-4">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span class="text-xs font-bold text-slate-500 uppercase">Explicación Gramatical:</span>
              <p class="text-slate-800 text-sm mt-1 leading-relaxed">${top[1]}</p>
            </div>

            <div class="p-4 bg-[#f7f6ef] rounded-2xl border-l-4 border-[#bb944c] space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#8c6b2b] uppercase">Ejemplo en Conversación:</span>
                <button onclick="window.speakText('${top[2].replace(/'/g, '')}')" class="px-3 py-1 bg-amber-100 text-[#8c6b2b] font-bold text-xs rounded-lg hover:bg-amber-200 flex items-center gap-1">🔊 Escuchar Audio</button>
              </div>
              <p class="text-slate-900 font-semibold text-base">${top[2]}</p>
            </div>

            <div class="flex justify-end pt-2">
              <button onclick="window.setSection('reading')" class="px-4 py-2 bg-[#176951] hover:bg-[#10543f] text-white rounded-xl text-xs font-bold">Continuar a Lectura →</button>
            </div>
          </div>
        ` : ''}

        <!-- 2. Lectura & Quiz -->
        ${activeTopicSection === 'reading' ? `
          <div class="space-y-4">
            <div class="p-5 bg-[#f4f7f5] rounded-2xl border border-slate-200 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#176951] uppercase">Reading Passage:</span>
                <button onclick="window.speakText('${top[3].replace(/'/g, '')}', 0.85)" class="px-3 py-1 bg-[#176951] text-white font-bold text-xs rounded-lg hover:bg-[#10543f] flex items-center gap-1">🔊 Escuchar Narración</button>
              </div>
              <p class="text-slate-900 text-base leading-relaxed font-serif">${top[3]}</p>
            </div>

            <div class="p-4 rounded-2xl border border-slate-200 space-y-3">
              <strong class="block text-slate-900 text-sm">Pregunta de Comprensión:</strong>
              <p class="text-slate-700 text-xs font-medium">${top[4]}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button onclick="window.selectReadingAns('${top[5]}')" class="p-3 rounded-xl border text-left text-xs font-bold transition ${currentReadingChecked ? (currentReadingAnswer === top[5] ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-slate-50 border-slate-200') : (currentReadingAnswer === top[5] ? 'border-[#176951] bg-[#176951]/10 text-[#176951]' : 'border-slate-200 hover:bg-slate-50')}">
                  ${top[5]} ${currentReadingChecked && top[5] === top[5] ? '✓ Correcto' : ''}
                </button>
                <button onclick="window.selectReadingAns('${top[6]}')" class="p-3 rounded-xl border text-left text-xs font-bold transition ${currentReadingChecked ? (currentReadingAnswer === top[6] ? 'bg-rose-100 border-rose-300 text-rose-900' : 'bg-slate-50 border-slate-200') : (currentReadingAnswer === top[6] ? 'border-[#176951] bg-[#176951]/10 text-[#176951]' : 'border-slate-200 hover:bg-slate-50')}">
                  ${top[6]}
                </button>
              </div>

              ${!currentReadingChecked ? `
                <button onclick="window.checkReadingAns()" class="px-4 py-2 bg-[#153958] text-white rounded-xl text-xs font-bold hover:bg-[#1e4a70]">Comprobar Respuesta</button>
              ` : `
                <div class="p-2.5 rounded-xl text-xs font-semibold ${currentReadingAnswer === top[5] ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
                  ${currentReadingAnswer === top[5] ? '¡Excelente! Respuesta correcta.' : 'La respuesta correcta es: ' + top[5]}
                </div>
              `}
            </div>

            <div class="flex justify-between pt-2">
              <button onclick="window.setSection('rule')" class="text-xs text-slate-500 font-bold hover:underline">← Anterior</button>
              <button onclick="window.setSection('grammar')" class="px-4 py-2 bg-[#176951] hover:bg-[#10543f] text-white rounded-xl text-xs font-bold">Continuar a Gramática →</button>
            </div>
          </div>
        ` : ''}

        <!-- 3. Práctica de Gramática -->
        ${activeTopicSection === 'grammar' ? `
          <div class="space-y-4">
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span class="text-xs font-bold text-[#176951] uppercase">Completa la Oración:</span>
              <p class="text-lg font-mono font-bold text-slate-800">${top[7]}</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <button onclick="window.selectGrammarAns('${top[8]}')" class="p-4 rounded-xl border font-bold text-center text-sm transition ${currentGrammarChecked ? (currentGrammarAnswer === top[8] ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-slate-50 border-slate-200') : (currentGrammarAnswer === top[8] ? 'border-[#176951] bg-[#176951]/10 text-[#176951]' : 'border-slate-200 hover:bg-slate-50')}">
                ${top[8]} ${currentGrammarChecked && top[8] === top[8] ? '✓' : ''}
              </button>
              <button onclick="window.selectGrammarAns('${top[9]}')" class="p-4 rounded-xl border font-bold text-center text-sm transition ${currentGrammarChecked ? (currentGrammarAnswer === top[9] ? 'bg-rose-100 border-rose-300 text-rose-900' : 'bg-slate-50 border-slate-200') : (currentGrammarAnswer === top[9] ? 'border-[#176951] bg-[#176951]/10 text-[#176951]' : 'border-slate-200 hover:bg-slate-50')}">
                ${top[9]}
              </button>
            </div>

            ${!currentGrammarChecked ? `
              <button onclick="window.checkGrammarAns()" class="px-4 py-2 bg-[#153958] text-white rounded-xl text-xs font-bold hover:bg-[#1e4a70]">Verificar Gramática</button>
            ` : `
              <div class="p-2.5 rounded-xl text-xs font-semibold ${currentGrammarAnswer === top[8] ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
                ${currentGrammarAnswer === top[8] ? '¡Exacto! Estructura correcta.' : 'La opción correcta es: ' + top[8]}
              </div>
            `}

            <div class="flex justify-between pt-2">
              <button onclick="window.setSection('reading')" class="text-xs text-slate-500 font-bold hover:underline">← Anterior</button>
              <button onclick="window.setSection('speaking')" class="px-4 py-2 bg-[#176951] hover:bg-[#10543f] text-white rounded-xl text-xs font-bold">Continuar a Misión Oral →</button>
            </div>
          </div>
        ` : ''}

        <!-- 4. Misión Oral -->
        ${activeTopicSection === 'speaking' ? `
          <div class="space-y-4">
            <div class="p-5 bg-[#edf4f0] rounded-2xl border border-[#d2e4d9] space-y-2">
              <span class="text-xs font-bold text-[#176951] uppercase">Consigna de Habla (Speaking Mission):</span>
              <p class="text-slate-900 font-bold text-base">${top[10]}</p>
              <p class="text-xs text-slate-600">Hablá en voz alta para practicar tu entonación antes de tu próxima clase en EEA.</p>
            </div>

            <div class="p-6 border border-slate-200 rounded-2xl text-center space-y-3 bg-white">
              <button onclick="window.toggleRecord()" class="w-16 h-16 rounded-full flex items-center justify-center mx-auto transition shadow-md ${isRecording ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#153958] text-white hover:bg-[#1e4a70]'}">
                <span class="text-2xl">${isRecording ? '⏹' : '🎤'}</span>
              </button>
              <p class="text-xs font-mono font-bold text-slate-700">
                ${isRecording ? 'Grabando práctica: 00:' + (recordSeconds < 10 ? '0' + recordSeconds : recordSeconds) : (hasRecorded ? '✓ Grabación finalizada con éxito' : 'Tocá el micrófono para practicar tu voz')}
              </p>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-slate-100">
              <button onclick="window.closeTopic()" class="text-xs font-bold text-slate-600 hover:text-slate-900">Volver a temas</button>
              <button onclick="window.completeAndExit('${topId}')" class="px-5 py-2.5 bg-[#176951] hover:bg-[#10543f] text-white text-xs font-bold rounded-xl shadow-sm transition">
                ✓ Completar y Guardar Avance
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderFlashcards() {
    const card = sampleCards[currentCardIdx] || sampleCards[0];
    return `
      <div class="max-w-xl mx-auto space-y-6 text-center">
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <span class="text-xs font-bold text-[#176951] uppercase">Repaso Diario EEA</span>
          <h2 class="text-xl font-bold text-[#153958]">Flashcards de Expresiones Clave</h2>
          <p class="text-xs text-slate-500 mt-1">Tarjeta ${currentCardIdx + 1} de ${sampleCards.length} · Tocá para ver la traducción</p>
        </div>

        <div onclick="window.flipCard()" class="bg-white rounded-3xl border-2 border-slate-200 hover:border-[#176951] p-8 shadow-md cursor-pointer select-none min-h-[220px] flex flex-col justify-center items-center space-y-3 transition">
          ${!isCardFlipped ? `
            <span class="text-xs text-slate-400 uppercase font-semibold">Frase en Inglés (Tocar para voltear)</span>
            <h3 class="text-2xl sm:text-3xl font-black text-[#153958]">"${card.en}"</h3>
            <p class="text-xs text-indigo-700 font-mono font-semibold">${card.ipa}</p>
            <button onclick="event.stopPropagation(); window.speakText('${card.en}')" class="px-4 py-1.5 bg-[#edf4f0] text-[#176951] rounded-full text-xs font-bold hover:bg-[#d5e8dc] transition">🔊 Escuchar audio</button>
          ` : `
            <span class="text-xs text-slate-400 uppercase font-semibold">Significado & Uso</span>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-800">${card.es}</h3>
            <p class="text-xs text-slate-500">Inglés: <strong>${card.en}</strong></p>
          `}
        </div>

        <div class="flex items-center justify-between">
          <button onclick="window.prevCard()" class="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50">← Anterior</button>
          <span class="text-xs text-slate-400 font-semibold">🔄 Toca la tarjeta</span>
          <button onclick="window.nextCard()" class="px-4 py-2 bg-[#176951] hover:bg-[#10543f] text-white rounded-xl text-xs font-bold">Siguiente →</button>
        </div>
      </div>
    `;
  }

  function renderPhonetics(levels) {
    return `
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <span class="text-xs font-bold text-[#176951] uppercase">Laboratorio Fonético EEA</span>
          <h2 class="text-xl font-bold text-[#153958]">Pronunciación Americana con Audio</h2>
          <p class="text-xs text-slate-500 mt-1">Hacé clic en cualquier palabra para escuchar su pronunciación nativa clara.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          ${['name', 'teacher', 'student', 'morning', 'afternoon', 'welcome', 'practice', 'extraordinary', 'friend', 'English', 'family', 'community'].map(w => `
            <div onclick="window.speakText('${w}')" class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-[#176951] cursor-pointer shadow-xs flex items-center justify-between group transition">
              <div>
                <strong class="text-slate-900 text-sm block group-hover:text-[#176951] transition">${w}</strong>
                <span class="text-[10px] text-slate-400">Tocar para oír</span>
              </div>
              <span class="text-base text-slate-400 group-hover:text-[#176951]">🔊</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ACCIONES GLOBALES DE NAVEGACIÓN
  window.switchTab = (tab) => { activeTab = tab; activeTopicIdx = null; render(); };
  window.selectLevel = (idx) => { activeLevelIdx = idx; activeTopicIdx = null; render(); };
  window.speakText = (text) => { speak(text); };

  // Abrir tema adentro de la página (Navegación fluida)
  window.openTopicInPage = (tIdx) => {
    activeTopicIdx = tIdx;
    activeTopicSection = 'rule';
    currentReadingAnswer = null;
    currentReadingChecked = false;
    currentGrammarAnswer = null;
    currentGrammarChecked = false;
    hasRecorded = false;
    isRecording = false;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.closeTopic = () => {
    activeTopicIdx = null;
    render();
  };

  window.setSection = (sec) => {
    activeTopicSection = sec;
    render();
  };

  window.selectReadingAns = (ans) => {
    currentReadingAnswer = ans;
    render();
  };
  window.checkReadingAns = () => {
    currentReadingChecked = true;
    render();
  };

  window.selectGrammarAns = (ans) => {
    currentGrammarAnswer = ans;
    render();
  };
  window.checkGrammarAns = () => {
    currentGrammarChecked = true;
    render();
  };

  window.toggleRecord = () => {
    if (!isRecording) {
      isRecording = true;
      recordSeconds = 0;
      recordTimer = setInterval(() => {
        recordSeconds++;
        if (recordSeconds >= 10) {
          clearInterval(recordTimer);
          isRecording = false;
          hasRecorded = true;
          render();
        } else {
          render();
        }
      }, 1000);
    } else {
      clearInterval(recordTimer);
      isRecording = false;
      hasRecorded = true;
    }
    render();
  };

  window.completeAndExit = (id) => {
    completedTopics[id] = true;
    saveProgress();
    activeTopicIdx = null;
    render();
  };

  window.toggleDone = (id) => {
    completedTopics[id] = !completedTopics[id];
    saveProgress();
    render();
  };

  window.flipCard = () => {
    isCardFlipped = !isCardFlipped;
    render();
  };
  window.nextCard = () => {
    isCardFlipped = false;
    currentCardIdx = (currentCardIdx + 1) % sampleCards.length;
    render();
  };
  window.prevCard = () => {
    isCardFlipped = false;
    currentCardIdx = (currentCardIdx - 1 + sampleCards.length) % sampleCards.length;
    render();
  };

  render();
})();
