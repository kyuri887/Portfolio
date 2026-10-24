/* ==========================================================
   Kauan Iury — Portfólio
   Edite os dados abaixo (PROFILE, PROJECTS, ENDPOINTS) para
   atualizar o conteúdo sem mexer no resto do código.
   ========================================================== */

import { sound } from './sound.js';
import { initChess } from './chess.js';

const PROFILE = {
  email: 'kauan.iury@outlook.com',
  linkedin: 'https://www.linkedin.com/in/kauan-iury'
};

// shape: forma que as partículas assumem ao selecionar o projeto (0 esfera · 1 nó · 2 cubo · 3 hélice · 4 galáxia)
const PROJECTS = [
  {
    tag: 'CRM · Seguros multirramo',
    title: 'CRM para seguros', shape: 1,
    desc: 'CRM para o fluxo comercial de diversos ramos — Garantia, Auto, Vida, Residencial e Empresarial: clientes, propostas, renovações e acompanhamento.',
    stack: ['JavaScript', 'IA', 'APIs REST', 'MySQL'],
    icon: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14c2.9.2 5 2.4 5 5.5"/>',
    bg: 'linear-gradient(135deg,#2a1240,#1a0f2e)', accent: '#9be23c',
    problem: 'Cada ramo de seguro tem etapas, prazos e regras próprias, e CRMs genéricos não acompanham bem esse fluxo, principalmente propostas em andamento e renovações.',
    solution: 'CRM orientado ao processo de seguros e preparado para vários ramos (Garantia, Auto, Vida, Residencial e Empresarial), com cadastro de clientes, controle de propostas e apólices por etapa, acompanhamento de renovações e IA integrada para agilizar a análise das informações e o atendimento.',
    impact: 'Funil comercial organizado em todos os ramos, menos renovações esquecidas e visão clara de cada negociação, do primeiro contato à emissão da apólice, com a IA reduzindo tarefas manuais da equipe.'
  },
  {
    tag: 'Integrações',
    title: 'Integração com APIs de seguradoras', shape: 3,
    desc: 'Conexão entre sistemas internos e APIs de seguradoras, padronizando dados de diferentes fornecedores.',
    stack: ['Java', 'Spring Boot', 'REST', 'JSON'],
    icon: '<path d="M4 7h13l-3.5-3.5"/><path d="M20 17H7l3.5 3.5"/>',
    bg: 'linear-gradient(135deg,#3a2a06,#1a0f2e)', accent: '#f7c12e',
    problem: 'Cada seguradora expõe sua própria API, com formatos e regras diferentes, gerando retrabalho manual.',
    solution: 'Camada de integração que consome as APIs das seguradoras e normaliza as respostas em um modelo único para o sistema.',
    impact: 'Menos digitação manual e informação consistente entre seguradoras em um só lugar.'
  },
  {
    tag: 'Automação',
    title: 'Automação de disparo de e-mails', shape: 2,
    desc: 'Rotinas automáticas de comunicação com clientes e parceiros, disparadas a partir de eventos do processo.',
    stack: ['Python', 'Automação', 'Templates'],
    icon: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    bg: 'linear-gradient(135deg,#1c3310,#1a0f2e)', accent: '#9be23c',
    problem: 'Comunicações recorrentes eram feitas manualmente, sujeitas a esquecimento e inconsistência.',
    solution: 'Automação em Python que dispara e-mails a partir de templates padronizados, conforme eventos e regras do processo.',
    impact: 'Comunicação no tempo certo e equipe liberada de tarefas repetitivas.'
  },
  {
    tag: 'APIs públicas',
    title: 'Portal de licitações', shape: 4,
    desc: 'Portal integrado ao PNCP, Portal da Transparência e Compras.gov.br para centralizar oportunidades.',
    stack: ['Java', 'PNCP', 'Portal da Transparência', 'Compras.gov.br'],
    icon: '<path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9.5 21v-6h5v6"/>',
    bg: 'linear-gradient(135deg,#251a4d,#1a0f2e)', accent: '#9e78ff',
    problem: 'Informações de licitações ficam espalhadas em diferentes portais públicos, cada um com sua API.',
    solution: 'Portal que consome as APIs públicas do PNCP, Portal da Transparência e Compras.gov.br e reúne os dados num só lugar.',
    impact: 'Busca de oportunidades mais rápida e centralizada para o time comercial de garantia.'
  },
  {
    tag: 'Inteligência Artificial',
    title: 'IA no hub corporativo', shape: 0,
    desc: 'Implantação de IA em hub corporativo com RAG e fine-tuning para respostas melhores e menos alucinação.',
    stack: ['RAG', 'Fine-tuning', 'LLM', 'Embeddings'],
    icon: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l2.5 2.5M16.5 16.5L19 19M5 19l2.5-2.5M16.5 7.5L19 5"/>',
    bg: 'linear-gradient(135deg,#3b1d63,#1a0f2e)', accent: '#f7c12e',
    problem: 'Modelos genéricos respondem sem conhecer o contexto da empresa e podem "alucinar" informações.',
    solution: 'Uso de RAG para ancorar respostas em documentos internos, combinado com fine-tuning para o domínio.',
    impact: 'Respostas mais precisas e alinhadas ao negócio, com redução de alucinações.'
  }
];

const ENDPOINTS = [
  {
    method: 'GET', path: '/api/v1/kauan', mapping: '', handler: 'perfil', type: 'PerfilDTO', call: 'perfilService.buscarPerfil()',
    status: '200 OK',
    data: {
      nome: 'Kauan Iury',
      cargo: 'Desenvolvedor Back-end Java',
      localizacao: 'Santo André, SP — Brasil',
      modalidades: ['Presencial', 'Híbrido', 'Remoto'],
      foco: ['Java', 'Spring Boot', 'APIs REST', 'IA aplicada'],
      mercado: 'Seguros / InsurTech',
      formacao: 'UNINOVE',
      disponivel: true
    }
  },
  {
    method: 'GET', path: '/api/v1/kauan/skills', mapping: '/skills', handler: 'skills', type: 'SkillsDTO', call: 'perfilService.buscarSkills()',
    status: '200 OK',
    data: {
      linguagens: { foco: 'Java', tambem: ['Python (com IA como copiloto)', 'JavaScript'] },
      backend: ['Java', 'Spring Boot', 'APIs REST', 'Princípios SOLID'],
      dados: ['MySQL', 'Modelagem de dados'],
      integracoes: ['APIs de seguradoras', 'PNCP', 'Portal da Transparência', 'Compras.gov.br'],
      ia: ['RAG', 'Fine-tuning', 'Redução de alucinação'],
      automacao: ['Python', 'Disparo de e-mails', 'Processos operacionais'],
      softSkills: ['Curiosidade', 'Aprendizado contínuo', 'Visão de negócio']
    }
  },
  {
    method: 'GET', path: '/api/v1/kauan/projetos', mapping: '/projetos', handler: 'projetos', type: 'List<ProjetoDTO>', call: 'projetoService.listar()',
    status: '200 OK',
    data: PROJECTS.map((p, i) => ({ id: i + 1, nome: p.title, categoria: p.tag, stack: p.stack }))
  },
  {
    method: 'GET', path: '/api/v1/kauan/experiencia', mapping: '/experiencia', handler: 'experiencia', type: 'List<ExperienciaDTO>', call: 'experienciaService.listar()',
    status: '200 OK',
    data: [
      { area: 'Seguro Garantia', tipo: 'negócio', aprendizado: 'Processos e regras do ramo' },
      { area: 'Desenvolvimento', entregas: ['CRMs', 'Integrações com seguradoras'] },
      { area: 'Automação', entregas: ['Disparo de e-mails', 'Portal de licitações'] },
      { area: 'Inteligência Artificial', tecnicas: ['RAG', 'Fine-tuning'] },
      { area: 'Agora', objetivo: 'Aprofundar Spring Boot e arquitetura de software' }
    ]
  },
  {
    method: 'POST', path: '/api/v1/kauan/contato', mapping: '/contato', handler: 'contato', type: 'ContatoResponse', call: 'contatoService.registrar(req)',
    status: '201 Created',
    data: {
      status: 'RECEBIDO',
      mensagem: 'Obrigado pelo interesse! Vamos conversar.',
      email: PROFILE.email,
      linkedin: PROFILE.linkedin
    }
  }
];

// Frases exibidas na tela de carregamento (uma aleatória por visita)
const QUOTES = [
  { text: 'A melhor maneira de prever o futuro é inventá-lo.', author: 'Alan Kay', role: 'Cientista da computação, pioneiro da programação orientada a objetos' },
  { text: 'Simplicidade é pré-requisito para confiabilidade.', author: 'Edsger W. Dijkstra', role: 'Cientista da computação, Prêmio Turing' },
  { text: 'Qualquer tolo escreve código que um computador entende. Bons programadores escrevem código que humanos entendem.', author: 'Martin Fowler', role: 'Engenheiro de software, autor de "Refactoring"' },
  { text: 'Programas devem ser escritos para que pessoas os leiam, e só incidentalmente para que máquinas os executem.', author: 'Harold Abelson & Gerald Sussman', role: 'Professores do MIT, autores de "SICP"' },
  { text: 'A otimização prematura é a raiz de todo mal.', author: 'Donald Knuth', role: 'Cientista da computação, autor de "The Art of Computer Programming"' },
  { text: 'Falar é fácil. Me mostre o código.', author: 'Linus Torvalds', role: 'Criador do Linux e do Git' },
  { text: 'Controlar a complexidade é a essência da programação de computadores.', author: 'Brian Kernighan', role: 'Cientista da computação, coautor da linguagem AWK' },
  { text: 'A frase mais perigosa da língua é: "sempre fizemos assim".', author: 'Grace Hopper', role: 'Cientista da computação e almirante da Marinha dos EUA' },
  { text: 'Só conseguimos enxergar um pouco à frente, mas já dá para ver muito do que precisa ser feito.', author: 'Alan Turing', role: 'Matemático, pai da ciência da computação' },
  { text: 'A imaginação é mais importante que o conhecimento.', author: 'Albert Einstein', role: 'Físico, Prêmio Nobel' },
  { text: 'Se vi mais longe, foi por estar sobre os ombros de gigantes.', author: 'Isaac Newton', role: 'Físico e matemático' },
  { text: 'Qualquer tecnologia suficientemente avançada é indistinguível de magia.', author: 'Arthur C. Clarke', role: 'Escritor e inventor' },
  { text: 'A ciência é mais do que um corpo de conhecimento. É uma forma de pensar.', author: 'Carl Sagan', role: 'Astrônomo e divulgador científico' },
  { text: 'Descobrir é ver o que todo mundo viu e pensar o que ninguém pensou.', author: 'Albert Szent-Györgyi', role: 'Bioquímico, Prêmio Nobel' },
  { text: 'Design não é só a aparência e a sensação. Design é como funciona.', author: 'Steve Jobs', role: 'Cofundador da Apple' },
  { text: 'Computadores são inúteis. Eles só sabem dar respostas.', author: 'Pablo Picasso', role: 'Pintor' },
  { text: 'Software é como entropia: difícil de agarrar, não pesa nada e obedece à segunda lei da termodinâmica — sempre aumenta.', author: 'Norman Augustine', role: 'Engenheiro aeroespacial, ex-CEO da Lockheed Martin' }
];

// Duração fixa da tela de carregamento (ms)
const LOADER_DURATION = 7000;

// Alvos do hero: passe o mouse para abrir o painel (x/y em % da tela)
const TOUCHPOINTS = [
  { x: 13, y: 66, up: true, title: 'back-end', rows: [['linguagem', 'java'], ['framework', 'spring boot'], ['padrões', 'rest · solid']] },
  { x: 86, y: 22, left: true, title: 'ia aplicada', rows: [['contexto', 'rag'], ['domínio', 'fine-tuning'], ['alucinação', 'reduzida']] },
  { x: 83, y: 74, left: true, up: true, title: 'insurtech', rows: [['ramo', 'seguro garantia'], ['integrações', 'seguradoras'], ['dados', 'pncp · compras.gov']] }
];

// Linhas do "terminal" da tela de carregamento, pelo percentual em que aparecem
const LOADER_LINES = [
  [0, '> inicializando jvm...'],
  [30, '> carregando frases científicas...'],
  [65, '> compilando KauanController.java...']
];

/* ---------------------------------------------------------- */

// todo carregamento (inclusive F5) começa no topo: o navegador não restaura a última posição
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
window.scrollTo(0, 0);
window.addEventListener('load', () => window.scrollTo(0, 0));
// ao sair, cobre a página com o fundo: o navegador mantém o último quadro na tela até o loader
// aparecer, e sem isso dava um "flash" do hero. Se a saída não acontecer (ex.: mailto), volta ao normal.
window.addEventListener('beforeunload', () => {
  document.documentElement.classList.add('is-leaving');
  setTimeout(() => document.documentElement.classList.remove('is-leaving'), 1000);
});

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
// animações de entrada reiniciam ao voltar para cima: tocam de novo toda vez que a seção aparece
ScrollTrigger.defaults({ toggleActions: 'play none none reset' });
// no celular a barra de endereço some/aparece ao rolar: não recalcula tudo a cada vez
ScrollTrigger.config({ ignoreMobileResize: true });

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const pad = (n, len = 2) => String(n).padStart(len, '0');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const isMobile = window.matchMedia('(max-width: 1024px)').matches;

/* ---------- Cena 3D (falha de WebGL/CDN não quebra a página) ---------- */
let scene = null;
let introDone = false;
// a cena carrega em paralelo: loader, cursor e frase não esperam o download do Three.js
import('./scene.js')
  .then(({ initScene }) => {
    scene = initScene($('#scene'), { mobile: isMobile, reduced });
    if (scene && introDone) scene.fadeIn();
  })
  .catch(() => $('#scene').classList.add('is-fallback'));

/* ---------- Smooth scroll ---------- */
let lenis = null;
const onScrollHooks = [];
if (!reduced && window.Lenis) {
  lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', (e) => {
    ScrollTrigger.update();
    scene?.setVelocity(e.velocity);
    onScrollHooks.forEach((fn) => fn());
  });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
} else {
  window.addEventListener('scroll', () => onScrollHooks.forEach((fn) => fn()), { passive: true });
}

/* ---------- Texto: divisão, embaralhamento e digitação ---------- */
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function splitChars(el) {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.innerHTML = [...text].map((c) => `<span class="char" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  return $$('.char', el);
}
$$('[data-split]').forEach(splitChars);

// divide em letras preservando os elementos internos (ex.: <span class="text-accent">)
function splitDeep(el) {
  el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
  const chars = [];
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(' '); return; }
          const word = document.createElement('span');
          word.className = 'bw';
          word.setAttribute('aria-hidden', 'true');
          [...part].forEach((c) => {
            const s = document.createElement('span');
            s.className = 'bc';
            s.textContent = c;
            word.append(s);
            chars.push(s);
          });
          frag.append(word);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  return chars;
}

// texto que "decodifica" a partir de caracteres aleatórios
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';
class Scramble {
  constructor(el) { this.el = el; this.raf = 0; this.queue = []; }
  set(text, spread = 22) {
    const from = this.el.textContent;
    const len = Math.max(from.length, text.length);
    this.queue = [];
    for (let i = 0; i < len; i++) {
      const start = Math.floor(Math.random() * spread);
      this.queue.push({ from: from[i] || '', to: text[i] || '', start, end: start + Math.floor(Math.random() * spread), char: '' });
    }
    cancelAnimationFrame(this.raf);
    this.frame = 0;
    return new Promise((resolve) => { this.resolve = resolve; this.update(); });
  }
  update = () => {
    let out = '';
    let done = 0;
    for (const q of this.queue) {
      if (this.frame >= q.end) { done++; out += escapeHtml(q.to); }
      else if (this.frame >= q.start) {
        if (!q.char || Math.random() < 0.28) q.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        out += `<span class="scr">${escapeHtml(q.char)}</span>`;
      } else out += escapeHtml(q.from);
    }
    if (done === this.queue.length) {
      this.el.textContent = this.queue.map((q) => q.to).join('');
      this.resolve();
      return;
    }
    this.el.innerHTML = out;
    this.frame++;
    this.raf = requestAnimationFrame(this.update);
  };
}
function setText(el, text, animate = true) {
  if (!animate || reduced) { el.textContent = text; return; }
  el._scr ??= new Scramble(el);
  // textos longos decodificam um pouco mais devagar, como no terminal
  el._scr.set(text, Math.min(40, 14 + Math.round(text.length / 12)));
}

// digitação estilo terminal com cursor em bloco; as letras já ocupam espaço (sem pulo de layout)
function prepareType(el, text = el.textContent) {
  el.textContent = '';
  const chars = [...text].map((c) => {
    const s = document.createElement('span');
    s.className = 'tc';
    s.textContent = c;
    return s;
  });
  const caret = document.createElement('span');
  caret.className = 'caret';
  caret.setAttribute('aria-hidden', 'true');
  el.append(...chars, caret);
  const placeCaret = (c) => {
    caret.style.display = 'block';
    caret.style.left = `${c.offsetLeft + c.offsetWidth + 2}px`;
    caret.style.top = `${c.offsetTop + c.offsetHeight * 0.1}px`;
    caret.style.height = `${c.offsetHeight * 0.8}px`;
  };
  return () => new Promise((resolve) => {
    if (reduced) { chars.forEach((c) => c.classList.add('is-on')); placeCaret(chars[chars.length - 1]); resolve(); return; }
    let i = 0;
    const step = () => {
      if (i >= chars.length) { resolve(); return; }
      const c = chars[i++];
      c.classList.add('is-on');
      placeCaret(c);
      sound.tick();
      setTimeout(step, rand(14, 40) * (Math.random() < 0.08 ? 5 : 1));
    };
    step();
  });
}

/* ---------- Transição em grade (quadrados que somem em ordem aleatória) ---------- */
const tilesEl = $('.tiles');
let tileCells = [];
function buildTiles() {
  const cols = window.innerWidth < 640 ? 6 : 12;
  const rows = Math.ceil(window.innerHeight / (window.innerWidth / cols));
  tilesEl.style.setProperty('--cols', cols);
  if (tileCells.length !== cols * rows) {
    tilesEl.innerHTML = '<span></span>'.repeat(cols * rows);
    tileCells = $$('span', tilesEl);
  }
}
function tilesCover(amount = 0.4) {
  buildTiles();
  tilesEl.classList.add('is-on');
  return gsap.fromTo(tileCells, { opacity: 0 }, { opacity: 1, duration: 0.001, stagger: { amount, from: 'random' } }).then();
}
function tilesReveal(amount = 0.5) {
  buildTiles();
  tilesEl.classList.add('is-on');
  return gsap.fromTo(tileCells, { opacity: 1 }, {
    opacity: 0, duration: 0.001, stagger: { amount: reduced ? 0 : amount, from: 'random' },
    onComplete: () => tilesEl.classList.remove('is-on')
  }).then();
}

/* ---------- Som: botão on/off + cliques ---------- */
const soundBtn = $('#soundToggle');
function syncSound() {
  soundBtn.setAttribute('aria-pressed', sound.enabled);
  soundBtn.setAttribute('aria-label', sound.enabled ? 'Som ligado' : 'Som desligado');
}
soundBtn.addEventListener('click', () => { sound.init(); sound.toggle(); syncSound(); sound.click(); });
syncSound();
document.addEventListener('click', (e) => {
  if (e.target.closest('a, button') && !e.target.closest('.work__item, .work__arrow, #soundToggle, .loader, .chess__board')) sound.click();
});

/* ---------- Projetos: seletor com colchetes + glitch na cena ---------- */
const workSection = $('#projetos');
let activeChapter = 0;
function setupWork() {
  const list = $('#workList');
  const corners = $('.work__corners', list);
  const titles = $('#workTitles');
  list.insertAdjacentHTML('beforeend', PROJECTS.map((p, i) => `
    <button class="work__item" role="tab" id="work-tab-${i}" aria-controls="workPanel" aria-selected="false" tabindex="-1" data-i="${i}">
      <span class="work__thumb"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p.icon}</svg></span>
      <span class="work__meta"><span class="work__num">[0${i + 1}]</span><span class="work__label">${p.title}</span></span>
    </button>`).join(''));
  titles.innerHTML = PROJECTS.map((p, i) => `
    <div class="work__title-item"><span class="is-eyebrow">[0${i + 1}]</span><span class="work__title-text">${p.title}</span></div>`).join('');
  const items = $$('.work__item', list);
  const titleItems = $$('.work__title-item', titles);
  let current = -1;

  const moveCorners = (instant) => {
    const it = items[current];
    if (!it) return;
    gsap.to(corners, { x: it.offsetLeft, y: it.offsetTop, width: it.offsetWidth, height: it.offsetHeight, duration: instant ? 0 : 0.45, ease: 'power3.out', overwrite: true });
  };

  const fill = (i, animate) => {
    const p = PROJECTS[i];
    $('#workTitle').textContent = p.title;
    setText($('#workTag'), `[${p.tag.toLowerCase()}]`, animate);
    setText($('#workDesc'), p.desc, animate);
    setText($('#workProblem'), p.problem, animate);
    setText($('#workSolution'), p.solution, animate);
    setText($('#workImpact'), p.impact, animate);
    $('#workStack').innerHTML = p.stack.map((s) => `<li class="chip">${s}</li>`).join('');
    if (animate && !reduced) gsap.from('#workStack li', { opacity: 0, y: 8, duration: 0.35, stagger: 0.05, ease: 'power2.out' });
  };

  // título sai para baixo e o novo entra de cima (ou o contrário ao voltar)
  const swapTitle = (prev, next, dir) => {
    if (prev >= 0) {
      gsap.to(titleItems[prev], { yPercent: 100 * dir, opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: true, onComplete: () => gsap.set(titleItems[prev], { visibility: 'hidden' }) });
    }
    gsap.fromTo(titleItems[next], { yPercent: -100 * dir, opacity: 0, visibility: 'visible' }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out', delay: prev >= 0 ? 0.12 : 0, overwrite: true });
    if (prev >= 0 && !reduced) {
      titles.classList.remove('is-glitch');
      void titles.offsetWidth;
      titles.classList.add('is-glitch');
    }
  };

  function select(i, { focus = false, animate = true } = {}) {
    i = (i + PROJECTS.length) % PROJECTS.length;
    if (i === current) return;
    const prev = current;
    current = i;
    items.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
    if (focus) items[i].focus({ preventScroll: true });
    $('#workPanel').setAttribute('aria-labelledby', items[i].id);
    $('#workCount').textContent = `${pad(i + 1)} / ${pad(PROJECTS.length)}`;
    moveCorners(!animate);
    fill(i, animate);
    swapTitle(prev, i, prev < 0 || i > prev ? 1 : -1);
    // no celular a lista é uma faixa horizontal: centraliza o item ativo
    if (list.scrollWidth > list.clientWidth + 2) {
      list.scrollTo({ left: items[i].offsetLeft - list.clientWidth / 2 + items[i].offsetWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
    }
    workSection.dataset.shape = PROJECTS[i].shape;
    if (!animate) return;
    sound.select();
    // a cena só faz o glitch + troca de forma se a seção de projetos estiver ativa
    if (chapters[activeChapter] === workSection && scene) {
      sound.glitch();
      scene.glitch(() => scene.goTo(PROJECTS[i].shape, 0, 1));
    }
  }

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.work__item');
    if (btn) select(+btn.dataset.i);
  });
  list.addEventListener('keydown', (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) { e.preventDefault(); select(current + keys[e.key], { focus: true }); }
    else if (e.key === 'Home') { e.preventDefault(); select(0, { focus: true }); }
    else if (e.key === 'End') { e.preventDefault(); select(PROJECTS.length - 1, { focus: true }); }
  });
  $$('.work__arrow').forEach((b) => b.addEventListener('click', () => select(current + +b.dataset.dir)));
  ScrollTrigger.addEventListener('refresh', () => moveCorners(true));
  window.addEventListener('resize', () => moveCorners(true));
  select(0, { animate: false });
}

/* ---------- Touchpoints do hero ---------- */
function setupTouchpoints() {
  const wrap = $('#touchpoints');
  wrap.innerHTML = TOUCHPOINTS.map((t, i) => `
    <div class="tp${t.left ? ' tp--left' : ''}${t.up ? ' tp--up' : ''}" style="--x:${t.x}%;--y:${t.y}%">
      <button class="tp__btn" aria-expanded="false" aria-controls="tp-panel-${i}" aria-label="Detalhes: ${t.title}">
        <span class="corners" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span class="tp__core"></span>
      </button>
      <span class="tp__label" aria-hidden="true">[${t.title}]</span>
      <div class="tp__panel panel" id="tp-panel-${i}">
        <span class="corners" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <p class="tp__title">[0${i + 1}] ${t.title}</p>
        ${t.rows.map(([k, v]) => `
          <div class="tp__row">
            <div class="tp__row-head"><span>${k}:</span><span class="tp__val" data-val="${v}">${v}</span></div>
            <span class="tp__bar"><i></i></span>
          </div>`).join('')}
      </div>
    </div>`).join('');

  $$('.tp', wrap).forEach((tp) => {
    const btn = $('.tp__btn', tp);
    const panel = $('.tp__panel', tp);
    const closed = tp.classList.contains('tp--left') ? 'inset(0 0 100% 100%)' : 'inset(0 100% 100% 0)';
    let open = false;
    const show = () => {
      if (open) return;
      open = true;
      tp.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      gsap.killTweensOf(panel);
      gsap.set(panel, { visibility: 'visible' });
      gsap.fromTo(panel, { clipPath: closed }, { clipPath: 'inset(0 0% 0% 0%)', duration: reduced ? 0 : 0.5, ease: 'expo.out' });
      gsap.fromTo($$('.tp__bar i', panel), { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 });
      $$('.tp__val', panel).forEach((v) => setText(v, v.dataset.val));
    };
    const hide = () => {
      if (!open) return;
      open = false;
      tp.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      gsap.to(panel, { clipPath: closed, duration: reduced ? 0 : 0.3, ease: 'expo.in', onComplete: () => gsap.set(panel, { visibility: 'hidden' }) });
    };
    tp.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') show(); });
    tp.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hide(); });
    btn.addEventListener('click', () => (open ? hide() : show()));
    tp.addEventListener('focusout', (e) => { if (!tp.contains(e.relatedTarget)) hide(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
  });
}

/* ---------- Navegação: links âncora (com transição em grade), menu mobile, dots ---------- */
const menuBtn = $('.menu-toggle');
const mobileMenu = $('.mobile-menu');
function toggleMenu(open) {
  menuBtn.setAttribute('aria-expanded', open);
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.setAttribute('aria-hidden', !open);
  mobileMenu.inert = !open;
  if (open) lenis?.stop(); else lenis?.start();
}
menuBtn.addEventListener('click', () => toggleMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) { toggleMenu(false); menuBtn.focus(); } });

let navBusy = false;
async function navigate(el) {
  if (!lenis || reduced) { el.scrollIntoView({ behavior: 'auto' }); return; }
  if (navBusy) return;
  navBusy = true;
  await tilesCover();
  lenis.scrollTo(el, { immediate: true, force: true });
  ScrollTrigger.update();
  await tilesReveal();
  navBusy = false;
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (id.length < 2) return;
  e.preventDefault();
  if (document.body.classList.contains('is-loading')) return;
  if (mobileMenu.classList.contains('is-open')) toggleMenu(false);
  const target = $(id);
  if (!target) return;
  navigate(target);
  // leva o foco do teclado para a seção (link "pular para o conteúdo", navegação por teclado)
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

const chapters = $$('[data-label]');
const dotsNav = $('.dots');
dotsNav.innerHTML = chapters.map((s) => `<a href="#${s.id}" aria-label="${s.dataset.label}"><span>[${s.dataset.label}]</span></a>`).join('');
const dots = $$('a', dotsNav);
const navLinks = $$('.nav a');
const hudSection = $('#hudSection');

function setChapter(i) {
  activeChapter = i;
  dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
  const id = '#' + chapters[i].id;
  navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === id));
  setText(hudSection, `[${pad(i + 1)}/${pad(chapters.length)}] ${chapters[i].dataset.label}`, introDone);
}

/* ---------- Header + HUD (percentual e coordenadas) ---------- */
const header = $('.header');
const hudPct = $('#hudPct');
ScrollTrigger.create({
  start: 0, end: 'max',
  onUpdate(self) {
    const y = self.scroll();
    header.classList.toggle('is-scrolled', y > 40);
    header.classList.toggle('is-hidden', self.direction === 1 && y > 300 && !mobileMenu.classList.contains('is-open'));
    hudPct.textContent = pad(Math.round(self.progress * 100), 3);
  }
});
if (finePointer) {
  const hudXY = $('#hudXY');
  let raf = 0;
  window.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { hudXY.textContent = `x ${pad(Math.round(e.clientX), 4)} · y ${pad(Math.round(e.clientY), 4)}`; });
  });
}

/* ---------- Animações de entrada por rolagem ---------- */
function setupScrollAnimations() {
  // faixa de tecnologias: corre sozinha em loop sem prender a rolagem;
  // anda da esquerda para a direita; rolar a página dá um empurrão
  const mq = $('.marquee');
  const mqTrack = $('.marquee__track');
  const mqList = mqTrack.querySelector('.marquee__list');
  const mqClone = mqList.cloneNode(true);
  mqClone.setAttribute('aria-hidden', 'true');
  mqTrack.appendChild(mqClone);
  {
    const setX = gsap.quickSetter(mqTrack, 'x', 'px');
    // a largura só existe depois do layout/fontes: observa em vez de ler uma vez só
    let mqW = 0, mqX = 0, mqBoost = 0, mqVisible = true;
    new ResizeObserver(() => { mqW = mqList.offsetWidth; }).observe(mqList);
    new IntersectionObserver(([e]) => { mqVisible = e.isIntersecting; }).observe(mq);
    if (!reduced) ScrollTrigger.create({
      trigger: mq, start: 'top bottom', end: 'bottom top',
      onUpdate: (self) => { mqBoost = Math.min(Math.abs(self.getVelocity()) / 140, 14); }
    });
    gsap.ticker.add((time, dt) => {
      if (!mqVisible || !mqW) return;
      mqBoost *= 0.93;
      const step = (reduced ? 0.7 : 2) + mqBoost;
      mqX = gsap.utils.wrap(-mqW, 0, mqX + step * (dt / 16.67));
      setX(mqX);
    });
  }

  if (!reduced) $$('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  // linhas de terminal: digitam uma vez quando aparecem
  $$('[data-type]').forEach((el) => {
    const run = prepareType(el);
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: run });
  });

  // títulos surgem letra a letra saindo do desfoque, presos à rolagem
  $$('[data-blur]').forEach((el) => {
    const chars = splitDeep(el);
    if (reduced) return;
    gsap.fromTo(chars, { opacity: 0, filter: 'blur(10px)' }, {
      opacity: 1, filter: 'blur(0px)', stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 92%', end: 'bottom 50%', scrub: true }
    });
  });

  // contadores
  $$('[data-count]').forEach((el) => {
    if (reduced) { el.textContent = el.dataset.count; return; }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: +el.dataset.count, duration: 1.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => { el.textContent = pad(Math.round(obj.v)); }
    });
  });

  // foto com parallax
  gsap.fromTo('.photo-card__mono', { yPercent: -18 }, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
  $$('.chip--float').forEach((c) => {
    // parallax simétrico e curto: passa pela posição alinhada no meio da seção, sem sair da foto
    const d = +c.dataset.depth * 0.5;
    gsap.fromTo(c, { y: d }, { y: -d, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // título do contato
  if (!reduced) gsap.from('.contact__title .char', {
    yPercent: 110, duration: 1, stagger: 0.035, ease: 'power4.out',
    scrollTrigger: { trigger: '.contact__title', start: 'top 85%' }
  });

  // timeline
  gsap.to('.tl__line-fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 65%', end: 'bottom 65%', scrub: true } });
  $$('.tl__item').forEach((item) => {
    if (!reduced) gsap.from(item, { x: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 85%' } });
    ScrollTrigger.create({
      trigger: item, start: 'top 65%',
      onEnter: () => item.classList.add('is-active'),
      onLeaveBack: () => item.classList.remove('is-active')
    });
  });

  // capítulos: troca a forma 3D, os dots, o link ativo e o HUD
  chapters.forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 45%',
      onToggle(self) {
        if (!self.isActive) return;
        setChapter(i);
        scene?.goTo(+sec.dataset.shape, +sec.dataset.x, +(sec.dataset.alpha ?? 1));
      }
    });
  });
}

/* ---------- Cursor: mira com colchetes que se encaixam no elemento ---------- */
function setupCursor() {
  if (!finePointer) return;
  document.body.classList.add('has-cursor');
  const cursor = $('.cursor');
  const box = $('.cursor__box');
  const label = $('.cursor__label');
  const SIZE = 26;
  const SEL = 'a, button, [data-cursor], [role="tab"]';
  const q = (el, p, d) => gsap.quickTo(el, p, { duration: d, ease: 'power3.out' });
  const bx = q(box, 'x', 0.3), by = q(box, 'y', 0.3), bw = q(box, 'width', 0.3), bh = q(box, 'height', 0.3);
  const dx = q('.cursor__dot', 'x', 0.05), dy = q('.cursor__dot', 'y', 0.05);
  let px = -100, py = -100, target = null;

  const place = () => {
    if (target?.isConnected) {
      const r = target.getBoundingClientRect();
      // elementos grandes (seções, cartões) não "prendem" a mira: só mostram o rótulo
      if (r.width > 0 && r.width <= 460 && r.height <= 260) {
        const p = 6;
        bx(r.left - p); by(r.top - p); bw(r.width + p * 2); bh(r.height + p * 2);
        cursor.classList.add('is-snap');
        return;
      }
    }
    cursor.classList.remove('is-snap');
    bx(px - SIZE / 2); by(py - SIZE / 2); bw(SIZE); bh(SIZE);
  };
  const retarget = (el) => {
    const t = el?.closest?.(SEL) || null;
    if (t !== target) {
      target = t;
      const text = t?.closest('[data-cursor]')?.dataset.cursor;
      label.textContent = text ? `[${text}]` : '';
      cursor.classList.toggle('has-label', !!text);
      if (t && !t.classList.contains('loader')) sound.hover();
    }
    place();
  };

  window.addEventListener('pointermove', (e) => {
    px = e.clientX; py = e.clientY;
    dx(px); dy(py);
    cursor.classList.add('is-visible');
    retarget(e.target);
  });
  // a página rola sob o mouse parado: reavalia o que está embaixo da mira
  onScrollHooks.push(() => retarget(document.elementFromPoint(px, py)));
  document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerdown', () => gsap.to(box, { scale: 0.85, duration: 0.15 }));
  document.addEventListener('pointerup', () => gsap.to(box, { scale: 1, duration: 0.3 }));
}

/* ---------- Botões magnéticos ---------- */
function setupMagnetic() {
  if (!finePointer || reduced) return;
  $$('[data-magnetic]').forEach((el) => {
    const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.25);
      qy((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)', overwrite: true }));
  });
}

/* ---------- Tilt 3D + spotlight na foto ---------- */
function setupTilt() {
  if (!finePointer || reduced) return;
  $$('[data-tilt]').forEach((el) => {
    const inner = $('.photo-card__inner', el);
    const shine = $('.photo-card__shine', el);
    const rx = gsap.quickTo(inner, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(inner, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 20);
      rx(-(py - 0.5) * 20);
      shine.style.setProperty('--mx', `${px * 100}%`);
      shine.style.setProperty('--my', `${py * 100}%`);
    });
    el.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });

  // chips da foto seguem o mouse em profundidades diferentes
  const about = $('.about');
  const chips = $$('.chip--float').map((c) => ({ d: +c.dataset.depth, x: gsap.quickTo(c, 'x', { duration: 0.8 }) }));
  about.addEventListener('pointermove', (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    chips.forEach((c) => c.x(nx * c.d * 0.6));
  });
}

/* ---------- Embaralhar ao passar o mouse ---------- */
function setupScramble() {
  if (reduced) return;
  $$('[data-scramble]').forEach((el) => {
    const original = el.textContent;
    const host = el.closest('a, button') || el;
    if (host !== el && !host.hasAttribute('aria-label')) host.setAttribute('aria-label', host.textContent.trim());
    const scr = new Scramble(el);
    let busy = false;
    host.addEventListener('pointerenter', () => {
      if (busy) return;
      busy = true;
      scr.set(original, 12).then(() => { busy = false; });
    });
  });
}

/* ---------- Playground da API ---------- */
function highlightJson(str) {
  return escapeHtml(str).replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?)/g, (m) => {
    let cls = 'tok-num';
    if (/^"/.test(m)) cls = /:$/.test(m) ? 'tok-key' : 'tok-str';
    else if (/true|false|null/.test(m)) cls = 'tok-bool';
    return `<span class="${cls}">${m}</span>`;
  });
}
function highlightJava(str) {
  return escapeHtml(str).replace(
    /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|\b(public|private|final|class|return|new|static|void)\b|\b([A-Z]\w*)\b/gm,
    (m, com, s, ann, kw, type) => {
      if (com) return `<span class="tok-com">${m}</span>`;
      if (s) return `<span class="tok-str">${m}</span>`;
      if (ann) return `<span class="tok-ann">${m}</span>`;
      if (kw) return `<span class="tok-kw">${m}</span>`;
      if (type) return `<span class="tok-type">${m}</span>`;
      return m;
    }
  );
}
function controllerCode(ep) {
  const isPost = ep.method === 'POST';
  const service = ep.call.split('.')[0];
  const serviceType = service.charAt(0).toUpperCase() + service.slice(1);
  const body = isPost
    ? `    @PostMapping("${ep.mapping}")
    public ResponseEntity<${ep.type}> ${ep.handler}(@RequestBody @Valid ContatoRequest req) {
        ${ep.type} resposta = ${ep.call};
        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }`
    : `    @GetMapping${ep.mapping ? `("${ep.mapping}")` : ''}
    public ResponseEntity<${ep.type}> ${ep.handler}() {
        return ResponseEntity.ok(${ep.call});
    }`;
  return `@RestController
@RequestMapping("/api/v1/kauan")
@RequiredArgsConstructor
public class KauanController {

    private final ${serviceType} ${service};

    // ${ep.method} ${ep.path}
${body}
}`;
}

function setupApi() {
  const list = $('#endpoints');
  const out = $('#consoleOut code');
  const status = $('#resStatus');
  const method = $('#reqMethod');
  const path = $('#reqPath');
  const sendBtn = $('#sendBtn');
  let current = 0;
  let tab = 'code'; // começa mostrando o controller; o Request leva para a resposta
  let pending;
  let inFlight = false; // requisição em andamento
  let response = null; // { i, ms } da última requisição enviada; some ao trocar de endpoint

  list.innerHTML = ENDPOINTS.map((ep, i) => `
    <button class="endpoint${i === 0 ? ' is-active' : ''}" data-i="${i}" role="tab" aria-selected="${i === 0}">
      <span class="method${ep.method === 'POST' ? ' method--post' : ''}">${ep.method}</span>${ep.path.replace('/api/v1', '')}
    </button>`).join('');

  const renderLines = (html) => {
    out.innerHTML = html.split('\n').map((l) => `<span class="ln">${l || ' '}</span>`).join('');
    if (!reduced) gsap.from($$('.ln', out), { opacity: 0, x: -10, duration: 0.4, stagger: 0.018, ease: 'power2.out' });
  };

  const showResponse = () => {
    const ep = ENDPOINTS[response.i];
    status.innerHTML = `<b>${ep.status}</b> · ${response.ms}ms · application/json`;
    renderLines(highlightJson(JSON.stringify(ep.data, null, 2)));
  };

  const showEmpty = () => {
    const ep = ENDPOINTS[current];
    status.innerHTML = '';
    out.innerHTML = `
      <div class="console__empty">
        <span class="console__empty-icon">⇅</span>
        <p><strong>Nenhuma requisição enviada ainda.</strong></p>
        <p>Clique em <b>request ▶</b> para executar <span class="method${ep.method === 'POST' ? ' method--post' : ''}">${ep.method}</span> <code>${ep.path}</code></p>
        <p class="console__empty-hint">ou pressione Ctrl + Enter</p>
      </div>`;
  };

  const showPending = () => {
    const ep = ENDPOINTS[current];
    status.innerHTML = '<span class="spinner"></span>enviando…';
    out.innerHTML = `<span class="ln tok-com">// ${ep.method} ${ep.path}${ep.method === 'POST' ? '  { "assunto": "oportunidade" }' : ''}</span>`;
  };

  const render = () => {
    // o botão pulsa enquanto o endpoint atual ainda não foi requisitado
    sendBtn.classList.toggle('is-pulse', !inFlight && !(response && response.i === current));
    if (tab === 'code') {
      status.innerHTML = 'Spring Boot · Java';
      renderLines(highlightJava(controllerCode(ENDPOINTS[current])));
    } else if (inFlight) {
      showPending();
    } else if (response && response.i === current) {
      showResponse();
    } else {
      showEmpty();
    }
  };

  function send() {
    const ep = ENDPOINTS[current];
    clearTimeout(pending);
    setTab('response', false);
    sendBtn.classList.remove('is-pulse');
    inFlight = true;
    showPending();
    const ms = Math.round(40 + Math.random() * 90);
    const i = current;
    pending = setTimeout(() => {
      inFlight = false;
      response = { i, ms };
      if (tab === 'response' && current === i) showResponse();
    }, reduced ? 0 : 380 + ms);
  }

  function setTab(name, rerender = true) {
    tab = name;
    $$('.console__tab').forEach((t) => { t.classList.toggle('is-active', t.dataset.tab === name); t.setAttribute('aria-selected', t.dataset.tab === name); });
    if (rerender) render();
  }

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.endpoint');
    if (!btn || +btn.dataset.i === current) return;
    current = +btn.dataset.i;
    clearTimeout(pending);
    inFlight = false;
    response = null;
    tab = 'code';
    $$('.console__tab').forEach((t) => { t.classList.toggle('is-active', t.dataset.tab === 'code'); t.setAttribute('aria-selected', t.dataset.tab === 'code'); });
    $$('.endpoint', list).forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', b === btn); });
    const ep = ENDPOINTS[current];
    method.textContent = ep.method;
    method.className = 'method' + (ep.method === 'POST' ? ' method--post' : '');
    path.textContent = ep.path;
    render();
  });
  sendBtn.addEventListener('click', send);
  $$('.console__tab').forEach((t) => t.addEventListener('click', () => setTab(t.dataset.tab)));

  // Ctrl/Cmd + Enter envia, como num cliente HTTP — só quando o console está visível
  let consoleVisible = false;
  ScrollTrigger.create({ trigger: '.console', start: 'top bottom', end: 'bottom top', onToggle: (self) => { consoleVisible = self.isActive; } });
  document.addEventListener('keydown', (e) => {
    if (consoleVisible && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); }
  });

  render();
}

/* ---------- Rodapé: ano, data e relógio ---------- */
$('#year').textContent = new Date().getFullYear();
const clockFmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const dateFmt = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', year: 'numeric' });
const tickClock = () => {
  const now = new Date();
  $('#clock').textContent = clockFmt.format(now);
  $('#date').textContent = dateFmt.format(now);
};
tickClock();
setInterval(tickClock, 1000);

/* ---------- Loader: frase científica, terminal e "clique para entrar" ---------- */
function loadAssets() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const page = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }));
  const timeout = new Promise((r) => setTimeout(r, 4000));
  return Promise.race([Promise.all([fonts, page]), timeout]);
}

let quoteIndex = -1;
function pickQuote() {
  let last = quoteIndex;
  if (last < 0) {
    try { const saved = localStorage.getItem('lastQuote'); if (saved !== null) last = +saved; } catch {}
  }
  let i;
  do { i = Math.floor(Math.random() * QUOTES.length); } while (i === last && QUOTES.length > 1);
  quoteIndex = i;
  try { localStorage.setItem('lastQuote', i); } catch {}
  return QUOTES[i];
}

function showQuote() {
  const q = pickQuote();
  const text = $('#quoteText');
  text.setAttribute('aria-label', q.text);
  text.innerHTML = q.text.split(' ').map((w) => `<span class="w" aria-hidden="true">${w} </span>`).join('');
  $('#quoteAuthor').textContent = q.author;
  $('#quoteRole').textContent = q.role;
  if (reduced) return;
  gsap.timeline()
    .from('.loader__quote .w', { opacity: 0, y: 14, filter: 'blur(6px)', duration: 0.6, stagger: 0.05, ease: 'power3.out', clearProps: 'filter' })
    .add(() => { setText($('#quoteAuthor'), q.author); setText($('#quoteRole'), q.role); }, '-=0.3');
}

const loader = $('.loader');
const terminal = $('#loaderTerminal');
let loaderReady = false;
let entered = false;

// avatar acompanha o mouse, holofote no fundo e clique troca a frase
function setupLoaderInteraction() {
  const avatar = $('.loader__avatar');
  const hint = $('.loader__hint');
  if (!finePointer) {
    hint.textContent = 'toque no avatar para outra frase';
    $('#loaderGate .blink').textContent = '[ toque para entrar ]';
  }
  const next = (e) => {
    e.stopPropagation();
    gsap.fromTo(avatar, { scale: 0.9 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    gsap.to('.loader__quote', {
      opacity: 0, y: -8, duration: 0.2, ease: 'power2.in',
      onComplete: () => { gsap.set('.loader__quote', { opacity: 1, y: 0 }); showQuote(); }
    });
    gsap.to(hint, { opacity: 0, duration: 0.4 });
  };
  avatar.addEventListener('click', next);
  avatar.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(e); } });

  // depois do 100%: clique em qualquer lugar (ou Enter) entra no site
  loader.addEventListener('click', () => { if (loaderReady) enterSite(); });
  document.addEventListener('keydown', (e) => {
    if (loaderReady && !entered && e.key === 'Enter' && document.activeElement !== avatar) { e.preventDefault(); enterSite(); }
  });

  if (!finePointer || reduced) return;
  const rx = gsap.quickTo(avatar, 'rotationX', { duration: 0.8, ease: 'power3.out' });
  const ry = gsap.quickTo(avatar, 'rotationY', { duration: 0.8, ease: 'power3.out' });
  const mx = gsap.quickTo(avatar, 'x', { duration: 0.9, ease: 'power3.out' });
  const my = gsap.quickTo(avatar, 'y', { duration: 0.9, ease: 'power3.out' });
  gsap.set(avatar, { transformPerspective: 600 });
  loader.addEventListener('pointermove', (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    ry(nx * 30); rx(-ny * 30); mx(nx * 24); my(ny * 16);
    loader.style.setProperty('--lx', `${e.clientX}px`);
    loader.style.setProperty('--ly', `${e.clientY}px`);
  });
}

// cada linha do terminal substitui a anterior; a fila evita duas digitando ao mesmo tempo
let terminalQueue = Promise.resolve();
function terminalLine(text) {
  terminalQueue = terminalQueue.then(() => prepareType(terminal, text)());
  return terminalQueue;
}

function heroIntro() {
  return gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('.hero__title .char', reduced ? { opacity: 0, duration: 0.6 } : { yPercent: 115, duration: 1.2, stagger: 0.05 })
    .from(['.hero__eyebrow', '.hero__lead', '.hero__ctas'], { y: reduced ? 0 : 24, opacity: 0, duration: 1, stagger: 0.1 }, '-=0.9')
    .from(['.header', '.dots'], { opacity: 0, duration: 1, clearProps: 'opacity' }, '<')
    .from('.tp', { scale: reduced ? 1 : 0, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, '-=0.7')
    .from('.scroll-cue', { opacity: 0, duration: 0.8 }, '-=0.5');
}

function enterSite() {
  if (entered) return;
  entered = true;
  loaderReady = false;
  sound.init();
  sound.enter();
  syncSound();
  loader.classList.remove('is-ready');
  gsap.timeline()
    .to(['.loader__inner', '.loader__status', '.loader__gate', '.loader__hud', '.loader__bar'], { opacity: 0, duration: 0.3, ease: 'power2.in' })
    .add(() => {
      // troca o fundo do loader por uma grade idêntica e dissolve os quadrados em ordem aleatória
      buildTiles();
      gsap.set(tileCells, { opacity: 1 });
      tilesEl.classList.add('is-on');
      loader.style.display = 'none';
      // garante o topo na entrada, mesmo que o navegador tenha restaurado a rolagem depois do load
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
      document.body.classList.remove('is-loading');
      lenis?.start();
      introDone = true;
      scene?.fadeIn();
      ScrollTrigger.refresh();
      tilesReveal(0.8);
    })
    .add(heroIntro(), '+=0.2');
}

function intro() {
  showQuote();
  setupLoaderInteraction();
  const counter = { v: 0 };
  const countEl = $('#loaderCount');
  const lines = [...LOADER_LINES];
  const loading = gsap.to(counter, {
    v: 100, duration: LOADER_DURATION / 1000, ease: 'power1.inOut',
    onUpdate: () => {
      const v = Math.round(counter.v);
      countEl.textContent = pad(v, 3);
      gsap.set('.loader__bar span', { scaleX: counter.v / 100 });
      while (lines.length && v >= lines[0][0]) terminalLine(lines.shift()[1]);
    }
  });

  Promise.all([loadAssets(), loading.then()]).then(() => {
    loaderReady = true;
    loader.classList.add('is-ready');
    loader.dataset.cursor = 'entrar';
    const gate = $('#loaderGate');
    gate.tabIndex = 0;
    gate.focus({ preventScroll: true });
    terminalLine('> pronto. aguardando input');
  });
}

/* ---------- Hero: parallax do título ao rolar ---------- */
function setupHeroScroll() {
  if (reduced) return;
  gsap.to('.hero__content', {
    yPercent: -18, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
}

/* ---------- Init ---------- */
setupTouchpoints();
setupWork();
setupScrollAnimations();
setupHeroScroll();
setupCursor();
setupMagnetic();
setupTilt();
setupScramble();
setupApi();
initChess($('#chess'), { gsap, sound });
setChapter(0);
intro();
