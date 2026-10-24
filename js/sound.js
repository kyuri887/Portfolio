/*
 * Efeitos sonoros sintetizados com Web Audio (sem arquivos de áudio).
 * O contexto só nasce depois de um gesto do usuário (clique no "entrar").
 */

let ctx = null;
let master = null;
let enabled = true;
let lastTick = 0;

try { const saved = localStorage.getItem('sound'); if (saved !== null) enabled = saved === 'on'; } catch {}

function tone({ type = 'sine', f0, f1 = f0, dur = 0.08, gain = 0.04, delay = 0 }) {
  if (!ctx || !enabled) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

// zumbido ambiente bem baixo: dois osciladores desafinados num filtro que "respira"
function startDrone() {
  const out = ctx.createGain();
  out.gain.value = 0.018;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 380;
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.07;
  lfoGain.gain.value = 160;
  lfo.connect(lfoGain).connect(filter.frequency);
  [55, 82.6, 110.4].forEach((f) => {
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    o.connect(filter);
    o.start();
  });
  filter.connect(out).connect(master);
  lfo.start();
}

export const sound = {
  get enabled() { return enabled; },

  init() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = enabled ? 1 : 0;
    master.connect(ctx.destination);
    startDrone();
    // aba em segundo plano: silencia tudo
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) ctx.suspend(); else if (enabled) ctx.resume();
    });
  },

  toggle() {
    enabled = !enabled;
    try { localStorage.setItem('sound', enabled ? 'on' : 'off'); } catch {}
    if (ctx) {
      if (enabled && ctx.state === 'suspended') ctx.resume();
      master.gain.setTargetAtTime(enabled ? 1 : 0, ctx.currentTime, 0.12);
    }
    return enabled;
  },

  hover() { tone({ type: 'sine', f0: 1900, f1: 2400, dur: 0.05, gain: 0.025 }); },
  click() { tone({ type: 'square', f0: 520, f1: 180, dur: 0.09, gain: 0.03 }); },
  select() {
    tone({ type: 'triangle', f0: 660, dur: 0.07, gain: 0.05 });
    tone({ type: 'triangle', f0: 990, dur: 0.12, gain: 0.04, delay: 0.07 });
  },
  glitch() { tone({ type: 'sawtooth', f0: 140, f1: 1200, dur: 0.32, gain: 0.025 }); },
  tick() {
    const now = performance.now();
    if (now - lastTick < 35) return;
    lastTick = now;
    tone({ type: 'square', f0: 2600 + Math.random() * 900, dur: 0.015, gain: 0.012 });
  },
  enter() {
    tone({ type: 'sine', f0: 120, f1: 880, dur: 0.6, gain: 0.06 });
    tone({ type: 'triangle', f0: 1320, dur: 0.25, gain: 0.03, delay: 0.45 });
  }
};
