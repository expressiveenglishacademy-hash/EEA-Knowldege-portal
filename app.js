// app.js - Portal EEA (rediseño académico). Reemplaza al app.js anterior; usa los mismos content.js y estilos base.
(function () {
  'use strict';
  const app = document.getElementById('app');
  if (!app) return;

  /* ---------- Fuentes y estilos ---------- */
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600;700&display=swap';
  document.head.appendChild(font);
  const css = document.createElement('style');
  css.textContent = `
  :root{--navy:#153958;--green:#176951;--gold:#bb944c;--ink:#18354a;--line:#dde5df;--paper:#f7f6ef}
  body{font-family:Inter,system-ui,sans-serif;background:#f2f5f2;color:var(--ink);line-height:1.5}
  .serif{font-family:Fraunces,Georgia,serif;letter-spacing:-.01em}
  .card{background:#fff;border:1px solid var(--line);border-radius:14px}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;font-weight:600;font-size:.88rem;padding:.65rem 1.1rem;border-radius:10px;cursor:pointer;transition:background .15s,border-color .15s}
  .btn:disabled{opacity:.45;cursor:not-allowed}
  .b-green{background:var(--green);color:#fff}.b-green:hover:not(:disabled){background:#10543f}
  .b-navy{background:var(--navy);color:#fff}.b-navy:hover:not(:disabled){background:#1e4a70}
  .b-soft{background:#fff;border:1px solid var(--line);color:var(--ink)}.b-soft:hover{border-color:var(--green)}
  .btn:focus-visible,.tab:focus-visible,.opt:focus-visible,.pill:focus-visible,.step:focus-visible,.chip:focus-visible,.flip:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
  .tab{display:inline-flex;gap:.4rem;align-items:center;padding:.5rem .9rem;border-radius:8px;font-size:.88rem;font-weight:600;color:#cfe0ea}
  .tab.on,.tab:hover{background:rgba(255,255,255,.14);color:#fff}
  .chip{display:inline-flex;gap:.35rem;align-items:center;background:rgba(255,255,255,.12);padding:.4rem .7rem;border-radius:8px;font-size:.8rem;font-weight:600;color:#fff}
  .hero{background:var(--navy);color:#fff;border-radius:14px;border-left:6px solid var(--gold)}
  .bar{height:8px;background:#e3e9e5;border-radius:99px;overflow:hidden}.bar>i{display:block;height:100%;background:var(--gold);border-radius:99px;transition:width .4s}
  .hero .bar{background:rgba(255,255,255,.22)}
  .pill{flex:none;padding:.45rem .9rem;border-radius:99px;font-size:.82rem;font-weight:600;background:#fff;border:1px solid var(--line);display:inline-flex;gap:.3rem;align-items:center}
  .pill.on{background:var(--navy);border-color:var(--navy);color:#fff}
  .opt{width:100%;text-align:left;padding:.85rem 1rem;border:1.5px solid var(--line);border-radius:10px;font-weight:600;font-size:.92rem;background:#fff;transition:border-color .15s,background .15s}
  .opt:hover:not(:disabled){border-color:var(--green)}.opt.sel{border-color:var(--green);background:#edf4f0}
  .opt.ok{border-color:#16a34a;background:#dcfce7}.opt.bad{border-color:#e11d48;background:#ffe4e6}
  .step{width:100%;text-align:left;padding:.6rem .7rem;border-radius:10px;border:1px solid var(--line);background:#fff;font-size:.78rem;font-weight:600;display:flex;gap:.5rem;align-items:center}
  .step b{width:22px;height:22px;border-radius:50%;background:#e8eeea;display:grid;place-items:center;font-size:.7rem;flex:none}
  .step.on{border-color:var(--green);background:#edf4f0}.step.on b,.step.past b{background:var(--green);color:#fff}
  .flip{perspective:1000px;cursor:pointer}.flip>div{position:relative;min-height:280px;transition:transform .5s;transform-style:preserve-3d}.flip.on>div{transform:rotateY(180deg)}
  .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;padding:1.5rem;text-align:center;background:#fff;border:1px solid var(--line);border-radius:20px;box-shadow:0 8px 24px rgba(21,57,88,.08)}
  .back{transform:rotateY(180deg);background:var(--paper)}
  .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#cfd8d2;margin:0 3px}.dot.on{background:var(--green)}
  .quote{background:var(--paper);border-left:4px solid var(--gold);border-radius:0 10px 10px 0}
  .rec{animation:pulse 1.2s infinite}@keyframes pulse{50%{opacity:.6}}
  @media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}`;
  document.head.appendChild(css);

  /* ---------- Iconos ---------- */
  const P = {
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM20 17v4H6.5',
    bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
    ear: 'M3 18v-6a9 9 0 0 1 18 0v6M3 18a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2zM21 18a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z',
    vol: 'M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14',
    mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3',
    stop: 'M6 6h12v12H6z',
    check: 'M20 6 9 17l-5-5',
    left: 'M19 12H5M12 19l-7-7 7-7',
    flame: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2.5-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.2 3 5 1.5 1.5 2 3.5 2 5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z',
    dl: 'M12 3v12m0 0-4-4m4 4 4-4M4 21h16'
  };
  const ic = (n, s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;

  /* ---------- Utilidades ---------- */
  const LS = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const SV = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
  const fmt = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const mmss = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

  let done = LS('eea_completed_topics', {});
  let days = LS('eea_days', []);
  const mark = () => { const t = fmt(new Date()); if (!days.includes(t)) { days.push(t); SV('eea_days', days.slice(-400)); } };
  const streak = () => {
    let n = 0; const d = new Date();
    if (!days.includes(fmt(d))) d.setDate(d.getDate() - 1);
    while (days.includes(fmt(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  const save = () => SV('eea_completed_topics', done);
  const levels = () => window.EEA || [];
  const tid = (l, t) => `l${l + 1}-t${t + 1}`;
  const levelDone = l => ((levels()[l] || {}).topics || []).filter((_, t) => done[tid(l, t)]).length;
  const totals = () => levels().reduce((a, L, i) => { a.t += (L.topics || []).length; a.d += levelDone(i); return a; }, { t: 0, d: 0 });

  const cards = [
    { en: 'Nice to meet you', es: 'Mucho gusto / Encantado de conocerte', ipa: '/naɪs tuː miːt juː/' },
    { en: 'How do you spell your name?', es: '¿Cómo se deletrea tu nombre?', ipa: '/haʊ duː juː spɛl jʊər neɪm/' },
    { en: 'Where are you from?', es: '¿De dónde sos / eres?', ipa: '/wɛər ɑːr juː frɒm/' },
    { en: 'I am nineteen years old', es: 'Tengo 19 años (en inglés se usa el verbo Be)', ipa: '/aɪ æm ˌnaɪnˈtiːn jɪərz oʊld/' },
    { en: 'What time does the class start?', es: '¿A qué hora empieza la clase?', ipa: '/wɒt taɪm dʌz ðə klɑːs stɑːrt/' },
    { en: 'Could you please repeat that?', es: '¿Podrías repetir eso, por favor?', ipa: '/kʊd juː pliːz rɪˈpiːt ðæt/' },
    { en: 'I am looking forward to it', es: 'Lo espero con muchas ganas', ipa: '/aɪ æm ˈlʊkɪŋ ˈfɔːrwərd tuː ɪt/' },
    { en: 'Fluency over accuracy', es: 'Priorizá la fluidez y la comunicación sobre el miedo a fallar', ipa: '/ˈfluːənsi ˈoʊvər ˈækjərəsi/' }
  ];
  const words = ['name', 'teacher', 'student', 'morning', 'afternoon', 'welcome', 'practice', 'extraordinary', 'friend', 'English', 'family', 'community'];
  const keys = ['rule', 'reading', 'grammar', 'speaking'];
  const stepNames = ['Regla', 'Lectura', 'Gramática', 'Práctica oral'];

  /* ---------- Estado ---------- */
  let tab = 'courses', lvl = 0, tIdx = null, sec = 'rule';
  let rOpts = [], gOpts = [], rAns = null, rChk = false, gAns = null, gChk = false;
  let ci = 0, flipped = false, showHelp = false, deferred = null;
  let recording = false, secs = 0, timer = null, mr = null, chunks = [], audioURL = null, recErr = '';

  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; render(true); });

  function speak(text, rate = 0.9) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = rate;
    speechSynthesis.speak(u);
  }

  /* ---------- Vistas ---------- */
  function header() {
    const tabs = [['courses', 'book', 'Cursos'], ['flashcards', 'bolt', 'Flashcards'], ['phonetics', 'ear', 'Fonética']];
    const n = streak();
    return `
    <header class="sticky top-0 z-40 text-white" style="background:var(--navy);border-bottom:3px solid var(--gold)">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <img src="LOGO%20EEA.jpg" alt="" class="w-10 h-10 rounded-lg bg-white/10 p-0.5 object-contain" onerror="this.style.display='none'">
          <div class="min-w-0">
            <div class="serif text-lg font-bold leading-tight truncate">Expressive English Academy</div>
            <div class="text-xs opacity-70 hidden sm:block">Embrace the Extraordinary</div>
          </div>
        </div>
        <nav class="hidden md:flex gap-1" aria-label="Secciones">
          ${tabs.map(t => `<button class="tab ${tab === t[0] ? 'on' : ''}" data-a="tab" data-v="${t[0]}" ${tab === t[0] ? 'aria-current="page"' : ''}>${ic(t[1], 16)}${t[2]}</button>`).join('')}
        </nav>
        <div class="flex items-center gap-2">
          <span class="chip" title="Días seguidos estudiando">${ic('flame', 15)}${n} ${n === 1 ? 'día' : 'días'}</span>
          <button class="chip" data-a="install">${ic('dl', 15)}<span class="hidden sm:inline">Instalar app</span></button>
          <a class="chip" href="login.html">Salir</a>
        </div>
      </div>
    </header>
    ${showHelp ? `<div class="max-w-6xl mx-auto px-4 mt-4"><div class="card p-4 text-sm flex justify-between gap-4"><p><strong>Instalá la app en tu celular.</strong> En Chrome: menú ⋮, luego "Instalar aplicación". En iPhone (Safari): Compartir, luego "Agregar a pantalla de inicio".</p><button class="btn b-soft" data-a="install">Cerrar</button></div></div>` : ''}`;
  }

  function bottomNav() {
    const tabs = [['courses', 'book', 'Cursos'], ['flashcards', 'bolt', 'Flashcards'], ['phonetics', 'ear', 'Fonética']];
    return `<nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t flex justify-around pt-2 safe-bottom" style="border-color:var(--line)" aria-label="Secciones">
      ${tabs.map(t => `<button data-a="tab" data-v="${t[0]}" class="flex flex-col items-center gap-0.5 px-4 py-1 text-xs font-semibold" style="color:${tab === t[0] ? 'var(--green)' : '#64748b'}">${ic(t[1], 22)}${t[2]}</button>`).join('')}
    </nav>`;
  }

  function courses() {
    const lv = levels(), L = lv[lvl] || { title: 'Nivel', topics: [], sounds: [] };
    const tp = L.topics || [], dn = levelDone(lvl), tot = totals();
    const pct = tp.length ? Math.round(dn / tp.length * 100) : 0;
    const gp = tot.t ? Math.round(tot.d / tot.t * 100) : 0;
    return `<div class="space-y-6">
      <section class="hero p-6 sm:p-8">
        <p class="text-sm font-semibold" style="color:#e3c88f">Nivel ${lvl + 1} de ${lv.length}</p>
        <h1 class="serif text-3xl sm:text-4xl font-bold mt-1 max-w-2xl">${esc(L.title)}</h1>
        <p class="mt-2 text-sm opacity-85 max-w-xl">${tp.length} temas con lectura, gramática, pronunciación y práctica oral.</p>
        <div class="mt-5 flex items-center gap-3 max-w-md"><div class="bar flex-1"><i style="width:${pct}%"></i></div><span class="text-sm font-semibold">${dn} de ${tp.length} completados</span></div>
      </section>

      <div class="grid grid-cols-2 gap-3 max-w-xl">
        <div class="card p-4"><div class="text-xs text-slate-500 font-semibold">Avance total</div><div class="serif text-2xl font-bold" style="color:var(--navy)">${gp}%</div><div class="bar mt-2"><i style="width:${gp}%"></i></div></div>
        <div class="card p-4"><div class="text-xs text-slate-500 font-semibold">Temas completados</div><div class="serif text-2xl font-bold" style="color:var(--navy)">${tot.d} <span class="text-sm font-sans text-slate-400">de ${tot.t}</span></div></div>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Niveles">
        ${lv.map((l, i) => `<button class="pill ${i === lvl ? 'on' : ''}" data-a="lvl" data-v="${i}">Nivel ${i + 1}${(l.topics || []).length && levelDone(i) === l.topics.length ? ic('check', 13) : ''}</button>`).join('')}
      </div>

      ${(L.sounds || []).length ? `<section>
        <h2 class="serif text-xl font-bold mb-3" style="color:var(--navy)">Sonidos clave de este nivel</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${L.sounds.map(s => `<div class="card p-3 flex items-center justify-between gap-3">
            <div><strong>${esc(s[0])}</strong> <span class="text-sm font-mono ml-1" style="color:#4f46e5">${esc(s[1])}</span><p class="text-sm text-slate-500">${esc(s[3])}</p></div>
            <button class="btn b-navy" style="padding:.5rem .7rem" data-a="say" data-v="${esc(s[0])}" aria-label="Escuchar ${esc(s[0])}">${ic('vol', 16)}</button>
          </div>`).join('')}
        </div></section>` : ''}

      <section>
        <h2 class="serif text-xl font-bold mb-3" style="color:var(--navy)">Temas de estudio</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${tp.map((t, i) => {
            const d = !!done[tid(lvl, i)];
            return `<article class="card p-5 flex flex-col justify-between gap-4" style="${d ? 'border-color:#86c3ad' : ''}">
              <div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-semibold" style="color:var(--green)">Tema ${i + 1}</span>
                  ${d ? `<span class="inline-flex items-center gap-1 text-emerald-700 font-semibold">${ic('check', 14)}Completado</span>` : '<span class="text-slate-400">Pendiente</span>'}
                </div>
                <h3 class="serif text-lg font-bold mt-1" style="color:var(--navy)">${esc(t[0])}</h3>
                <p class="text-sm text-slate-600 mt-1 line-clamp-3">${esc(t[1])}</p>
              </div>
              <div class="space-y-3">
                <div class="quote p-2 pl-3 flex items-center justify-between gap-2">
                  <span class="text-sm italic truncate">${esc(t[2])}</span>
                  <button class="shrink-0" style="color:#8c6b2b" data-a="say" data-v="${esc(t[2])}" aria-label="Escuchar ejemplo">${ic('vol', 18)}</button>
                </div>
                <button class="btn b-green w-full" data-a="open" data-v="${i}">${d ? 'Repasar tema' : 'Empezar tema'}</button>
              </div>
            </article>`;
          }).join('')}
        </div>
      </section>
    </div>`;
  }

  function opts(list, ans, chk, correct, act) {
    return list.map(o => {
      let c = 'opt';
      if (chk) { if (o === correct) c += ' ok'; else if (o === ans) c += ' bad'; }
      else if (o === ans) c += ' sel';
      return `<button class="${c}" data-a="${act}" data-v="${esc(o)}" ${chk ? 'disabled' : ''}>${esc(o)}</button>`;
    }).join('');
  }
  const verdict = (ok, good, bad) => `<div class="p-3 rounded-lg text-sm font-semibold ${ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}" role="status">${ok ? good : bad}</div>`;

  function topicView() {
    const L = levels()[lvl], t = L.topics[tIdx], id = tid(lvl, tIdx), d = !!done[id], si = keys.indexOf(sec);
    let body = '';
    if (sec === 'rule') {
      body = `<div class="space-y-4 max-w-3xl">
        <div class="card p-5"><h3 class="font-semibold mb-1">Explicación</h3><p class="leading-relaxed">${esc(t[1])}</p></div>
        <div class="quote p-5 space-y-2">
          <div class="flex items-center justify-between gap-3"><h3 class="font-semibold">Ejemplo en una conversación</h3>
          <button class="btn b-soft" data-a="say" data-v="${esc(t[2])}">${ic('vol', 16)}Escuchar</button></div>
          <p class="serif text-xl font-medium">${esc(t[2])}</p>
        </div></div>`;
    } else if (sec === 'reading') {
      body = `<div class="space-y-4 max-w-3xl">
        <div class="card p-5 space-y-3"><div class="flex items-center justify-between gap-3"><h3 class="font-semibold">Lectura</h3>
          <button class="btn b-soft" data-a="slow" data-v="${esc(t[3])}">${ic('vol', 16)}Escuchar lectura</button></div>
          <p class="serif text-lg leading-8">${esc(t[3])}</p></div>
        <div class="card p-5 space-y-3"><h3 class="font-semibold">Pregunta de comprensión</h3><p>${esc(t[4])}</p>
          <div class="grid sm:grid-cols-2 gap-2">${opts(rOpts, rAns, rChk, t[5], 'rA')}</div>
          ${rChk ? verdict(rAns === t[5], '¡Muy bien! Respuesta correcta.', 'La respuesta correcta es: ' + esc(t[5])) : `<button class="btn b-navy" data-a="rC" ${rAns ? '' : 'disabled'}>Comprobar respuesta</button>`}
        </div></div>`;
    } else if (sec === 'grammar') {
      body = `<div class="space-y-4 max-w-3xl">
        <div class="card p-5"><h3 class="font-semibold mb-2">Completá la oración</h3><p class="text-xl font-mono font-bold">${esc(t[7])}</p></div>
        <div class="grid grid-cols-2 gap-3">${opts(gOpts, gAns, gChk, t[8], 'gA')}</div>
        ${gChk ? verdict(gAns === t[8], '¡Exacto! La estructura es correcta.', 'La opción correcta es: ' + esc(t[8])) : `<button class="btn b-navy" data-a="gC" ${gAns ? '' : 'disabled'}>Verificar</button>`}
      </div>`;
    } else {
      body = `<div class="space-y-4 max-w-3xl">
        <div class="quote p-5"><h3 class="font-semibold mb-1">Tu misión oral</h3><p class="serif text-xl font-medium">${esc(t[10])}</p>
          <p class="text-sm text-slate-600 mt-2">Grabate hablando y escuchá tu práctica antes de la próxima clase. La grabación queda solo en tu dispositivo.</p></div>
        <div class="card p-6 text-center space-y-3">
          <button class="btn ${recording ? 'rec' : 'b-navy'}" style="${recording ? 'background:#e11d48;color:#fff;' : ''}width:72px;height:72px;border-radius:50%;padding:0" data-a="rec" aria-label="${recording ? 'Detener grabación' : 'Empezar a grabar'}">${ic(recording ? 'stop' : 'mic', 28)}</button>
          <p class="text-sm font-semibold" role="status">${recording ? 'Grabando <span id="rec-t" class="font-mono">' + mmss(secs) + '</span>' : (audioURL ? 'Escuchá tu grabación' : 'Tocá el micrófono para empezar')}</p>
          ${recErr ? `<p class="text-sm text-rose-700">${esc(recErr)}</p>` : ''}
          ${audioURL && !recording ? `<audio controls src="${audioURL}" class="mx-auto w-full max-w-sm"></audio>` : ''}
        </div></div>`;
    }
    const prev = si > 0 ? `<button class="btn b-soft" data-a="sec" data-v="${keys[si - 1]}">${ic('left', 16)}Anterior</button>` : '<span></span>';
    const next = si < 3 ? `<button class="btn b-green" data-a="sec" data-v="${keys[si + 1]}">Continuar a ${stepNames[si + 1].toLowerCase()}</button>`
      : `<button class="btn b-green" data-a="finish" data-v="${id}">${ic('check', 16)}Completar y guardar avance</button>`;
    return `<div class="space-y-6">
      <div class="flex items-center justify-between gap-3">
        <button class="btn b-soft" data-a="close">${ic('left', 16)}Temas del nivel ${lvl + 1}</button>
        <button class="btn ${d ? 'b-soft' : 'b-soft'}" data-a="done" data-v="${id}">${d ? ic('check', 16) + 'Completado' : 'Marcar como estudiado'}</button>
      </div>
      <div><p class="text-sm font-semibold" style="color:var(--green)">Tema ${tIdx + 1} del nivel ${lvl + 1}</p>
        <h1 class="serif text-3xl font-bold" style="color:var(--navy)">${esc(t[0])}</h1></div>
      <ol class="grid grid-cols-4 gap-2" aria-label="Pasos del tema">${keys.map((k, i) => `<li><button class="step ${k === sec ? 'on' : ''} ${i < si ? 'past' : ''}" data-a="sec" data-v="${k}"><b>${i < si ? ic('check', 12) : i + 1}</b><span class="leading-tight">${stepNames[i]}</span></button></li>`).join('')}</ol>
      ${body}
      <div class="flex justify-between items-center gap-3 pt-2">${prev}${next}</div>
    </div>`;
  }

  function flashcards() {
    const c = cards[ci];
    return `<div class="max-w-xl mx-auto space-y-5">
      <div class="text-center"><p class="text-sm font-semibold" style="color:var(--green)">Repaso diario</p>
        <h1 class="serif text-3xl font-bold" style="color:var(--navy)">Expresiones clave</h1>
        <p class="text-sm text-slate-500 mt-1">Tarjeta ${ci + 1} de ${cards.length}. Tocá la tarjeta para ver el significado.</p></div>
      <div class="flip ${flipped ? 'on' : ''}" data-a="flip" tabindex="0" role="button" aria-label="Voltear tarjeta">
        <div>
          <div class="face"><div class="serif text-3xl font-bold" style="color:var(--navy)">${esc(c.en)}</div>
            <div class="font-mono text-sm" style="color:#4f46e5">${esc(c.ipa)}</div>
            <button class="btn b-soft" data-a="say" data-v="${esc(c.en)}">${ic('vol', 16)}Escuchar</button></div>
          <div class="face back"><div class="text-sm text-slate-500">Significado</div><div class="serif text-2xl font-bold">${esc(c.es)}</div></div>
        </div>
      </div>
      <div class="text-center">${cards.map((_, i) => `<i class="dot ${i === ci ? 'on' : ''}"></i>`).join('')}</div>
      <div class="flex justify-between"><button class="btn b-soft" data-a="prev">${ic('left', 16)}Anterior</button><button class="btn b-green" data-a="next">Siguiente</button></div>
    </div>`;
  }

  function phonetics() {
    return `<div class="max-w-3xl mx-auto space-y-5">
      <div><p class="text-sm font-semibold" style="color:var(--green)">Laboratorio de fonética</p>
        <h1 class="serif text-3xl font-bold" style="color:var(--navy)">Pronunciación americana</h1>
        <p class="text-sm text-slate-500 mt-1">Tocá una palabra para escucharla y repetila en voz alta.</p></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        ${words.map(w => `<button class="card p-4 flex items-center justify-between text-left hover:border-emerald-700 transition-colors" data-a="say" data-v="${w}"><strong>${w}</strong><span class="text-slate-400">${ic('vol', 18)}</span></button>`).join('')}
      </div></div>`;
  }

  /* ---------- Render ---------- */
  function render(keep) {
    const y = window.scrollY;
    let main = tab === 'courses' ? (tIdx !== null ? topicView() : courses()) : tab === 'flashcards' ? flashcards() : phonetics();
    app.innerHTML = header() + `<main class="flex-1 max-w-6xl w-full mx-auto px-4 py-6 pb-28 md:pb-12">${main}</main>` + bottomNav();
    window.scrollTo(0, keep ? y : 0);
  }

  /* ---------- Grabación real de voz ---------- */
  function stopRec() { if (mr && mr.state === 'recording') mr.stop(); }
  async function toggleRec() {
    if (recording) { stopRec(); return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) { recErr = 'Tu navegador no permite grabar audio.'; render(true); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = []; mr = new MediaRecorder(stream);
      mr.ondataavailable = e => chunks.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        clearInterval(timer); recording = false;
        if (audioURL) URL.revokeObjectURL(audioURL);
        audioURL = tIdx !== null ? URL.createObjectURL(new Blob(chunks, { type: mr.mimeType })) : null;
        render(true);
      };
      mr.start(); recording = true; secs = 0; recErr = '';
      timer = setInterval(() => {
        secs++;
        const el = document.getElementById('rec-t'); if (el) el.textContent = mmss(secs);
        if (secs >= 90) stopRec();
      }, 1000);
    } catch (err) { recErr = 'Permití el acceso al micrófono para poder grabarte.'; }
    render(true);
  }

  /* ---------- Acciones ---------- */
  const go = () => render(false);
  const H = {
    tab: v => { stopRec(); tab = v; tIdx = null; go(); },
    lvl: v => { lvl = +v; tIdx = null; render(true); },
    open: v => {
      stopRec(); tIdx = +v; sec = 'rule'; mark();
      const t = levels()[lvl].topics[tIdx];
      rOpts = shuffle([t[5], t[6]]); gOpts = shuffle([t[8], t[9]]);
      rAns = gAns = null; rChk = gChk = false; audioURL = null; recErr = '';
      go();
    },
    close: () => { stopRec(); tIdx = null; go(); },
    sec: v => { sec = v; go(); },
    rA: v => { rAns = v; render(true); }, rC: () => { rChk = true; render(true); },
    gA: v => { gAns = v; render(true); }, gC: () => { gChk = true; render(true); },
    rec: toggleRec,
    slow: v => speak(v, 0.85),
    say: v => speak(v),
    done: v => { done[v] = !done[v]; if (done[v]) mark(); save(); render(true); },
    finish: v => { done[v] = true; mark(); save(); stopRec(); tIdx = null; go(); },
    flip: (v, el) => { flipped = !flipped; el.classList.toggle('on', flipped); },
    next: () => { flipped = false; ci = (ci + 1) % cards.length; render(true); },
    prev: () => { flipped = false; ci = (ci - 1 + cards.length) % cards.length; render(true); },
    install: () => {
      if (deferred) { deferred.prompt(); deferred = null; showHelp = false; }
      else showHelp = !showHelp;
      render(true);
    }
  };
  app.addEventListener('click', e => {
    const el = e.target.closest('[data-a]');
    if (el && H[el.dataset.a]) H[el.dataset.a](el.dataset.v, el);
  });
  app.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('flip')) { e.preventDefault(); H.flip(null, e.target); }
  });

  render(false);
})();
