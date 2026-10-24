/* ==========================================================
   Xadrez interativo: você joga de brancas contra o "Kauan" (IA simples).
   Regras completas: xeque, roque, en passant, promoção (vira dama),
   xeque-mate, afogamento e material insuficiente.
   ========================================================== */

const GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };
const VALUE = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };
const KNIGHT = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const LINE = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const ALL = [...DIAG, ...LINE];
const FILES = 'abcdefgh';

const colorOf = (p) => (p ? (p === p.toUpperCase() ? 'w' : 'b') : null);
const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
const other = (c) => (c === 'w' ? 'b' : 'w');
const sqName = (i) => FILES[i & 7] + (8 - (i >> 3));

function startState() {
  const b = Array(64).fill(null);
  const back = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
  back.forEach((p, c) => { b[c] = p.toLowerCase(); b[56 + c] = p; b[8 + c] = 'p'; b[48 + c] = 'P'; });
  return { b, turn: 'w', castle: { K: true, Q: true, k: true, q: true }, ep: -1 };
}

// alguma peça de `by` ataca a casa `sq`?
function attacked(b, sq, by) {
  const r = sq >> 3, c = sq & 7;
  const up = by === 'w';
  const pr = up ? r + 1 : r - 1;
  const pawn = up ? 'P' : 'p', knight = up ? 'N' : 'n', king = up ? 'K' : 'k';
  const bishop = up ? 'B' : 'b', rook = up ? 'R' : 'r', queen = up ? 'Q' : 'q';
  for (const dc of [-1, 1]) if (inside(pr, c + dc) && b[pr * 8 + c + dc] === pawn) return true;
  for (const [dr, dc] of KNIGHT) if (inside(r + dr, c + dc) && b[(r + dr) * 8 + c + dc] === knight) return true;
  for (const [dr, dc] of ALL) if (inside(r + dr, c + dc) && b[(r + dr) * 8 + c + dc] === king) return true;
  const ray = (dirs, a, q) => dirs.some(([dr, dc]) => {
    for (let rr = r + dr, cc = c + dc; inside(rr, cc); rr += dr, cc += dc) {
      const p = b[rr * 8 + cc];
      if (p) return p === a || p === q;
    }
    return false;
  });
  return ray(DIAG, bishop, queen) || ray(LINE, rook, queen);
}

const kingSq = (b, color) => b.indexOf(color === 'w' ? 'K' : 'k');
const inCheck = (s) => attacked(s.b, kingSq(s.b, s.turn), other(s.turn));

function pseudoMoves(s) {
  const { b, turn } = s;
  const moves = [];
  const add = (from, to, extra) => moves.push({ from, to, ...extra });
  for (let i = 0; i < 64; i++) {
    const p = b[i];
    if (!p || colorOf(p) !== turn) continue;
    const r = i >> 3, c = i & 7, t = p.toUpperCase();
    if (t === 'P') {
      const dir = turn === 'w' ? -1 : 1, start = turn === 'w' ? 6 : 1, last = turn === 'w' ? 0 : 7;
      const r1 = r + dir;
      if (!inside(r1, c)) continue;
      if (!b[r1 * 8 + c]) {
        add(i, r1 * 8 + c, { promo: r1 === last });
        if (r === start && !b[(r + 2 * dir) * 8 + c]) add(i, (r + 2 * dir) * 8 + c, { double: true });
      }
      for (const dc of [-1, 1]) {
        if (!inside(r1, c + dc)) continue;
        const to = r1 * 8 + c + dc;
        if (b[to] && colorOf(b[to]) !== turn) add(i, to, { promo: r1 === last });
        else if (to === s.ep) add(i, to, { ep: true });
      }
    } else if (t === 'N' || t === 'K') {
      for (const [dr, dc] of t === 'N' ? KNIGHT : ALL) {
        if (!inside(r + dr, c + dc)) continue;
        const to = (r + dr) * 8 + c + dc;
        if (colorOf(b[to]) !== turn) add(i, to);
      }
      if (t === 'K') {
        const foe = other(turn), home = turn === 'w' ? 60 : 4;
        const [k, q, rook] = turn === 'w' ? ['K', 'Q', 'R'] : ['k', 'q', 'r'];
        if (i === home && !attacked(b, home, foe)) {
          if (s.castle[k] && !b[home + 1] && !b[home + 2] && b[home + 3] === rook &&
              !attacked(b, home + 1, foe) && !attacked(b, home + 2, foe)) add(i, home + 2, { castle: 'k' });
          if (s.castle[q] && !b[home - 1] && !b[home - 2] && !b[home - 3] && b[home - 4] === rook &&
              !attacked(b, home - 1, foe) && !attacked(b, home - 2, foe)) add(i, home - 2, { castle: 'q' });
        }
      }
    } else {
      const dirs = t === 'B' ? DIAG : t === 'R' ? LINE : ALL;
      for (const [dr, dc] of dirs) {
        for (let rr = r + dr, cc = c + dc; inside(rr, cc); rr += dr, cc += dc) {
          const to = rr * 8 + cc;
          if (!b[to]) { add(i, to); continue; }
          if (colorOf(b[to]) !== turn) add(i, to);
          break;
        }
      }
    }
  }
  return moves;
}

function makeMove(s, m) {
  const b = s.b.slice();
  const p = b[m.from];
  const white = s.turn === 'w';
  const captured = m.ep ? b[m.to + (white ? 8 : -8)] : b[m.to];
  b[m.to] = m.promo ? (white ? 'Q' : 'q') : p;
  b[m.from] = null;
  if (m.ep) b[m.to + (white ? 8 : -8)] = null;
  if (m.castle === 'k') { b[m.to - 1] = b[m.to + 1]; b[m.to + 1] = null; }
  if (m.castle === 'q') { b[m.to + 1] = b[m.to - 2]; b[m.to - 2] = null; }
  const castle = { ...s.castle };
  if (p === 'K') castle.K = castle.Q = false;
  if (p === 'k') castle.k = castle.q = false;
  const touch = (sq) => {
    if (sq === 63) castle.K = false; if (sq === 56) castle.Q = false;
    if (sq === 7) castle.k = false; if (sq === 0) castle.q = false;
  };
  touch(m.from); touch(m.to);
  return { b, turn: other(s.turn), castle, ep: m.double ? (m.from + m.to) / 2 : -1, captured };
}

function legalMoves(s) {
  return pseudoMoves(s).filter((m) => {
    const n = makeMove(s, m);
    return !attacked(n.b, kingSq(n.b, s.turn), n.turn);
  });
}

const insufficient = (b) => b.every((p) => !p || 'KkNnBb'.includes(p)) && b.filter((p) => p && 'NnBb'.includes(p)).length <= 1;

/* ---------- IA: negamax com poda alfa-beta, material + centro ---------- */
function evaluate(b) {
  let score = 0;
  for (let i = 0; i < 64; i++) {
    const p = b[i];
    if (!p) continue;
    const t = p.toUpperCase(), r = i >> 3, c = i & 7;
    let v = VALUE[t];
    if (t === 'N' || t === 'B' || t === 'P') v += (7 - Math.abs(3.5 - c) - Math.abs(3.5 - r)) * 4;
    if (t === 'P') v += (colorOf(p) === 'w' ? 6 - r : r - 1) * 6;
    score += colorOf(p) === 'w' ? v : -v;
  }
  return score;
}

const capValue = (s, m) => (s.b[m.to] ? VALUE[s.b[m.to].toUpperCase()] : 0) + (m.promo ? 800 : 0);

function search(s, depth, alpha, beta) {
  if (depth === 0) return evaluate(s.b) * (s.turn === 'w' ? 1 : -1);
  const moves = legalMoves(s);
  if (!moves.length) return inCheck(s) ? -100000 - depth : 0;
  moves.sort((a, z) => capValue(s, z) - capValue(s, a));
  for (const m of moves) {
    const v = -search(makeMove(s, m), depth - 1, -beta, -alpha);
    if (v >= beta) return v;
    if (v > alpha) alpha = v;
  }
  return alpha;
}

function bestMove(s, depth = 3) {
  const moves = legalMoves(s).sort(() => Math.random() - 0.5);
  let best = null, bestV = -Infinity;
  for (const m of moves) {
    const v = -search(makeMove(s, m), depth - 1, -Infinity, -bestV);
    if (v > bestV) { bestV = v; best = m; }
  }
  return best;
}

/* ---------- Interface ---------- */
export function initChess(root, { gsap, sound } = {}) {
  if (!root) return;
  const board = root.querySelector('.chess__board');
  const status = root.querySelector('.chess__status');
  const log = root.querySelector('.chess__log');
  const undoBtn = root.querySelector('[data-chess="undo"]');

  let state = startState();
  let history = [];
  let moves = [];
  let selected = -1;
  let last = null;
  let thinking = false;
  let over = false;
  let drag = null;
  const played = [];

  const squares = [];
  for (let i = 0; i < 64; i++) {
    const sq = document.createElement('button');
    sq.type = 'button';
    sq.className = 'chess__sq ' + (((i >> 3) + (i & 7)) % 2 ? 'is-dark' : 'is-light');
    sq.dataset.i = i;
    if ((i & 7) === 0) sq.dataset.rank = 8 - (i >> 3);
    if (i >> 3 === 7) sq.dataset.file = FILES[i & 7];
    board.appendChild(sq);
    squares.push(sq);
  }

  const targetsOf = (from) => moves.filter((m) => m.from === from);

  function render(anim) {
    const checkSq = inCheck(state) ? kingSq(state.b, state.turn) : -1;
    const targets = selected >= 0 ? targetsOf(selected).map((m) => m.to) : [];
    squares.forEach((sq, i) => {
      const p = state.b[i];
      sq.innerHTML = p ? `<span class="chess__pc is-${colorOf(p)}">${GLYPH[p.toUpperCase()]}︎</span>` : '';
      sq.classList.toggle('is-selected', i === selected);
      sq.classList.toggle('is-target', targets.includes(i));
      sq.classList.toggle('is-capture', targets.includes(i) && !!p);
      sq.classList.toggle('is-last', !!last && (i === last.from || i === last.to));
      sq.classList.toggle('is-check', i === checkSq);
      const name = sqName(i);
      sq.setAttribute('aria-label', p ? `${name}, ${colorOf(p) === 'w' ? 'branca' : 'preta'} ${pieceName(p)}` : name);
    });
    // a peça desliza da casa de origem até a de destino
    if (anim && gsap) {
      const pc = squares[anim.to].querySelector('.chess__pc');
      const size = board.clientWidth / 8;
      if (pc) gsap.from(pc, { x: ((anim.from & 7) - (anim.to & 7)) * size, y: ((anim.from >> 3) - (anim.to >> 3)) * size, duration: 0.28, ease: 'power3.out' });
    }
    undoBtn.disabled = thinking || !history.length;
  }

  function pieceName(p) {
    return { K: 'rei', Q: 'dama', R: 'torre', B: 'bispo', N: 'cavalo', P: 'peão' }[p.toUpperCase()];
  }

  function setStatus(text, tone = '') {
    status.textContent = text;
    status.dataset.tone = tone;
  }

  function logMove(m, piece) {
    const sym = piece.toUpperCase() === 'P' ? '' : GLYPH[piece.toUpperCase()] + '︎';
    const txt = m.castle === 'k' ? 'O-O' : m.castle === 'q' ? 'O-O-O' : `${sym}${sqName(m.from)}${state.captured ? '×' : '–'}${sqName(m.to)}${m.promo ? '=♛︎' : ''}`;
    played.push(txt);
    renderLog();
  }

  function renderLog() {
    const pairs = [];
    for (let k = 0; k < played.length; k += 2) pairs.push(`${k / 2 + 1}. ${played[k]}${played[k + 1] ? '  ' + played[k + 1] : ''}`);
    log.textContent = pairs.slice(-4).join('\n');
  }

  function play(m, animate = true) {
    const piece = state.b[m.from];
    history.push(state);
    state = makeMove(state, m);
    last = m;
    selected = -1;
    logMove(m, piece);
    moves = legalMoves(state);
    if (state.captured) sound?.select(); else sound?.click();
    render(animate ? m : null);
    return checkEnd();
  }

  function checkEnd() {
    const check = inCheck(state);
    if (!moves.length) {
      over = true;
      if (check) {
        const youWon = state.turn === 'b';
        setStatus(youWon ? 'xeque-mate. você venceu!' : 'xeque-mate. o Kauan venceu.', youWon ? 'win' : 'lose');
        if (youWon) sound?.enter(); else sound?.glitch();
      } else setStatus('afogamento. empate.', 'draw');
      return true;
    }
    if (insufficient(state.b)) { over = true; setStatus('material insuficiente. empate.', 'draw'); return true; }
    if (check) setStatus(state.turn === 'w' ? 'xeque! proteja o rei.' : 'xeque no Kauan.', 'check');
    return false;
  }

  function aiTurn() {
    thinking = true;
    setStatus('o Kauan está pensando…', 'think');
    render();
    setTimeout(() => {
      const m = bestMove(state);
      thinking = false;
      if (m && !play(m) && !inCheck(state)) setStatus('sua vez. você joga de brancas.');
    }, 420);
  }

  function userMove(to, animate) {
    const m = targetsOf(selected).find((x) => x.to === to);
    if (!m) return false;
    if (!play(m, animate)) aiTurn();
    return true;
  }

  function select(i) {
    selected = i;
    render();
  }

  const canTouch = () => !thinking && !over && state.turn === 'w';
  const ownPiece = (i) => colorOf(state.b[i]) === 'w';

  board.addEventListener('pointerdown', (e) => {
    const sq = e.target.closest('.chess__sq');
    if (!sq || !canTouch() || e.button > 0) return;
    const i = +sq.dataset.i;
    if (selected >= 0 && userMove(i, true)) return;
    if (!ownPiece(i)) { select(-1); return; }
    select(i);
    const pc = squares[i].querySelector('.chess__pc');
    drag = { i, pc, x: e.clientX, y: e.clientY, moved: false };
    board.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  board.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 4) return;
    drag.moved = true;
    drag.pc.classList.add('is-drag');
    drag.pc.style.transform = `translate(${dx}px, ${dy}px) scale(1.15)`;
  });

  const endDrag = (e) => {
    if (!drag) return;
    const d = drag;
    drag = null;
    d.pc.classList.remove('is-drag');
    d.pc.style.transform = '';
    if (!d.moved || e.type === 'pointercancel') return;
    const under = document.elementFromPoint(e.clientX, e.clientY)?.closest('.chess__sq');
    if (!under || +under.dataset.i === d.i || !userMove(+under.dataset.i, false)) render();
  };
  board.addEventListener('pointerup', endDrag);
  board.addEventListener('pointercancel', endDrag);

  // teclado: Tab até a casa, Enter/Espaço seleciona e move
  board.addEventListener('click', (e) => {
    if (e.detail !== 0) return;
    const sq = e.target.closest('.chess__sq');
    if (!sq || !canTouch()) return;
    const i = +sq.dataset.i;
    if (selected >= 0 && userMove(i, true)) return;
    select(ownPiece(i) ? i : -1);
    squares[i].focus();
  });

  root.querySelector('[data-chess="reset"]').addEventListener('click', () => {
    if (thinking) return;
    state = startState(); history = []; played.length = 0; last = null; selected = -1; over = false;
    moves = legalMoves(state);
    renderLog();
    setStatus('nova partida. sua vez, você joga de brancas.');
    render();
  });

  undoBtn.addEventListener('click', () => {
    if (thinking || !history.length) return;
    // volta até a sua última vez de jogar (sua jogada + a resposta do Kauan)
    do { state = history.pop(); played.pop(); } while (state.turn !== 'w' && history.length);
    last = null; selected = -1; over = false;
    moves = legalMoves(state);
    renderLog();
    setStatus('jogada desfeita. sua vez.');
    render();
  });

  moves = legalMoves(state);
  setStatus('sua vez. você joga de brancas.');
  render();
}
