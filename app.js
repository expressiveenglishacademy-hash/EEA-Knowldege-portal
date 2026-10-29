// app.js - Plataforma Moderna EEA con 12 Niveles, Audio TTS, Flashcards y PWA
(function () {
  'use strict';

  const app = document.getElementById('app');
  if (!app) return;

  let activeTab = 'courses';
  let activeLevelIdx = 0;
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
      <!-- Header -->
      <header class="sticky top-0 z-40 bg-[#153958] text-white shadow-md border-b border-[#20486c]">
        <div class="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <img src="LOGO%20EEA.jpg" alt="EEA" class="w-10 h-10 rounded-lg object-contain bg-white/10 p-0.5 border border-white/20" onerror="this.style.display='none'">
            <div>
              <span class="font-extrabold text-base tracking-tight text-white block leading-none">Expressive English</span>
              <p class="text-[11px] text-[#b9d9d0] hidden sm:block">Embrace the Extraordinary · Portal de Aprendizaje</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            ${deferredInstallPrompt ? `
              <button id="install-btn" class="flex items-center gap-1.5 bg-[#176951] hover:bg-[#10543f] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                📲 Instalar App
              </button>
            ` : `
              <button onclick="alert('En Chrome: tocá los 3 puntos ⋮ y luego Instalar Aplicación.\\nEn iPhone: tocá Compartir y Agregar a Inicio.')" class="flex items-center gap-1 bg-white/10 text-white text-xs px-2.5 py-1.5 rounded-lg">
                📲 Instalar
              </button>
            `}
            <a href="login.html" class="text-xs bg-white/10 px-2.5 py-1.5 rounded-lg text-slate-200 hover:text-white">Salir</a>
          </div>
        </div>
      </header>

      <!-- Desktop Subnav -->
      <div class="hidden md:flex bg-white border-b border-slate-200 justify-center gap-4 py-2 text-xs font-bold">
        <button onclick="window.switchTab('courses')" class="px-4 py-2 rounded-lg ${activeTab === 'courses' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">📚 12 Niveles de Cursos</button>
        <button onclick="window.switchTab('flashcards')" class="px-4 py-2 rounded-lg ${activeTab === 'flashcards' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">⚡ Flashcards Rápidas</button>
        <button onclick="window.switchTab('phonetics')" class="px-4 py-2 rounded-lg ${activeTab === 'phonetics' ? 'bg-[#176951] text-white' : 'text-slate-600 hover:bg-slate-100'}">🎧 Pronunciación & Audio</button>
      </div>

      <!-- Main Container -->
      <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-6 pb-24 md:pb-12">
    `;

    if (activeTab === 'courses') {
      html += renderCourses(levels, currentLevel);
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
        <!-- Level Horizontal Scroll -->
        <div class="bg-white p-3 rounded-2xl border border-slate-200 overflow-x-auto flex gap-2">
    `;
    levels.forEach((lvl, i) => {
      const isSel = i === activeLevelIdx;
      h += `
        <button onclick="window.selectLevel(${i})" class="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold ${isSel ? 'bg-[#153958] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
          Nivel ${i + 1}
        </button>
      `;
    });
    h += `
        </div>

        <!-- Level Hero -->
        <div class="bg-gradient-to-r from-[#153958] to-[#176951] text-white p-6 rounded-3xl shadow-md">
          <span class="text-xs uppercase tracking-widest text-[#b9d9d0] font-bold">Nivel Oficial ${levelNum} de 12</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold mt-1">${currentLevel.title || 'Me and My Identity'}</h1>
          <p class="text-xs text-slate-200 mt-2">6 temas interactivos con lectura, ejercicios de gramática y fonética.</p>
        </div>

        <!-- Sounds Spotlight -->
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
          <button onclick="window.speakText('${s[0]}')" class="p-2 bg-[#153958] text-white rounded-lg hover:bg-[#1e4a70]">🔊</button>
        </div>
      `;
    });
    h += `
          </div>
        </div>

        <!-- Topics List -->
        <div class="space-y-3">
          <h3 class="text-base font-bold text-[#153958]">Temas de Estudio (Nivel ${levelNum})</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    `;
    (currentLevel.topics || []).forEach((top, tIdx) => {
      const topId = `l${levelNum}-t${tIdx + 1}`;
      const isDone = !!completedTopics[topId];
      h += `
        <div class="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#176951] shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-[#176951] uppercase">Tema ${tIdx + 1}</span>
              ${isDone ? '<span class="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">✓ Listo</span>' : '<span class="text-slate-400">Pendiente</span>'}
            </div>
            <h4 class="font-bold text-slate-900 text-base mt-1">${top[0]}</h4>
            <p class="text-xs text-slate-600 line-clamp-3 mt-1 leading-relaxed">${top[1]}</p>
          </div>

          <div class="pt-3 border-t border-slate-100 space-y-2">
            <div class="p-2 bg-[#f7f6ef] rounded-lg border-l-2 border-[#bb944c] flex items-center justify-between">
              <span class="text-[11px] text-slate-800 italic truncate">${top[2]}</span>
              <button onclick="window.speakText('${top[2].replace(/'/g, '')}')" class="text-xs text-[#bb944c] hover:underline font-bold ml-1">🔊</button>
            </div>

            <div class="flex items-center justify-between pt-1">
              <button onclick="window.toggleDone('${topId}')" class="text-xs font-semibold ${isDone ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-900'}">
                ${isDone ? '✓ Completado' : 'Marcar como visto'}
              </button>
              <button onclick="window.openTopicDetails(${activeLevelIdx}, ${tIdx})" class="px-3 py-1 bg-[#176951] text-white rounded-lg text-xs font-bold hover:bg-[#10543f]">
                Ver Detalle →
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

  function renderFlashcards() {
    return `
      <div class="max-w-xl mx-auto space-y-6 text-center">
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <span class="text-xs font-bold text-[#176951] uppercase">Repaso Diario EEA</span>
          <h2 class="text-xl font-bold text-[#153958]">Flashcards de Expresiones Clave</h2>
          <p class="text-xs text-slate-500 mt-1">Tocá la tarjeta para voltearla y practicar la frase.</p>
        </div>

        <div class="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-md cursor-pointer select-none min-h-[220px] flex flex-col justify-center items-center space-y-3">
          <span class="text-xs text-slate-400 uppercase font-semibold">Frase en Inglés</span>
          <h3 class="text-2xl font-black text-[#153958]">"Nice to meet you"</h3>
          <p class="text-xs text-indigo-700 font-mono">/naɪs tuː miːt juː/</p>
          <button onclick="window.speakText('Nice to meet you')" class="px-4 py-1.5 bg-[#edf4f0] text-[#176951] rounded-full text-xs font-bold">🔊 Escuchar audio</button>
        </div>
      </div>
    `;
  }

  function renderPhonetics(levels) {
    return `
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="bg-white p-5 rounded-2xl border border-slate-200">
          <span class="text-xs font-bold text-[#176951] uppercase">Laboratorio Fonético</span>
          <h2 class="text-xl font-bold text-[#153958]">Pronunciación Americana con Audio</h2>
          <p class="text-xs text-slate-500 mt-1">Hacé clic en cualquier palabra para escuchar su pronunciación correcta.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          ${['name', 'teacher', 'student', 'morning', 'afternoon', 'welcome', 'practice', 'extraordinary', 'friend', 'English'].map(w => `
            <div onclick="window.speakText('${w}')" class="p-4 bg-white rounded-2xl border border-slate-200 hover:border-[#176951] cursor-pointer shadow-xs flex items-center justify-between">
              <div>
                <strong class="text-slate-900 text-sm block">${w}</strong>
                <span class="text-[10px] text-slate-400">Tocar para oír</span>
              </div>
              <span class="text-base">🔊</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Métodos globales
  window.switchTab = (tab) => { activeTab = tab; render(); };
  window.selectLevel = (idx) => { activeLevelIdx = idx; render(); };
  window.speakText = (text) => { speak(text); };
  window.toggleDone = (id) => {
    completedTopics[id] = !completedTopics[id];
    saveProgress();
    render();
  };
  window.openTopicDetails = (lvlIdx, tIdx) => {
    const topic = window.EEA[lvlIdx].topics[tIdx];
    alert("Tema: " + topic[0] + "\n\nRegla: " + topic[1] + "\n\nEjemplo: " + topic[2] + "\n\nLectura: " + topic[3]);
  };

  render();
})();
