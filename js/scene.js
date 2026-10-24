import * as THREE from 'three';

/*
 * Cena 3D de partículas que fazem "morph" entre 5 formas, uma por capítulo:
 * 0 esfera (início) · 1 nó toroidal (sobre/trajetória) · 2 cubo em grade (projetos)
 * 3 dupla hélice (API / IA) · 4 galáxia (contato)
 */

const rand = (a, b) => a + Math.random() * (b - a);

function sphere(n, r = 1.7) {
  const out = new Float32Array(n * 3);
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = phi * i;
    const rr = r * (0.96 + Math.random() * 0.08);
    out.set([Math.cos(t) * rad * rr, y * rr, Math.sin(t) * rad * rr], i * 3);
  }
  return out;
}

function torusKnot(n) {
  const geo = new THREE.TorusKnotGeometry(1.15, 0.34, 400, 40, 2, 3);
  const src = geo.attributes.position.array;
  const verts = src.length / 3;
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const v = Math.floor(Math.random() * verts) * 3;
    out.set([src[v] + rand(-0.03, 0.03), src[v + 1] + rand(-0.03, 0.03), src[v + 2] + rand(-0.03, 0.03)], i * 3);
  }
  geo.dispose();
  return out;
}

function cubeLattice(n, s = 1.25) {
  const out = new Float32Array(n * 3);
  const grid = 7;
  for (let i = 0; i < n; i++) {
    const face = Math.floor(Math.random() * 6);
    let u = rand(-1, 1), v = rand(-1, 1);
    // prende metade dos pontos às linhas da grade -> visual de "estrutura"
    if (Math.random() < 0.75) {
      if (Math.random() < 0.5) u = Math.round(u * grid) / grid;
      else v = Math.round(v * grid) / grid;
    }
    const sign = face % 2 ? 1 : -1;
    const axis = Math.floor(face / 2);
    const p = [0, 0, 0];
    p[axis] = sign;
    p[(axis + 1) % 3] = u;
    p[(axis + 2) % 3] = v;
    out.set([p[0] * s, p[1] * s, p[2] * s], i * 3);
  }
  return out;
}

function helix(n) {
  const out = new Float32Array(n * 3);
  const turns = 3.2, h = 4.2, r = 0.85;
  for (let i = 0; i < n; i++) {
    const t = Math.random();
    const a = t * Math.PI * 2 * turns;
    const y = (t - 0.5) * h;
    if (Math.random() < 0.18) {
      // degraus entre as fitas
      const rungT = Math.round(t * 40) / 40;
      const ra = rungT * Math.PI * 2 * turns;
      const k = rand(-1, 1);
      out.set([Math.cos(ra) * r * k, (rungT - 0.5) * h, Math.sin(ra) * r * k], i * 3);
    } else {
      const off = Math.random() < 0.5 ? 0 : Math.PI;
      out.set([Math.cos(a + off) * r + rand(-0.04, 0.04), y + rand(-0.04, 0.04), Math.sin(a + off) * r + rand(-0.04, 0.04)], i * 3);
    }
  }
  return out;
}

function galaxy(n) {
  const out = new Float32Array(n * 3);
  const arms = 4;
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 1.1) * 2.7 + 0.18;
    const arm = (i % arms) / arms * Math.PI * 2;
    const a = arm + r * 1.9;
    const spread = 0.28 * r;
    const x = Math.cos(a) * r + rand(-spread, spread);
    const y = rand(-0.12, 0.12) * (1.5 - r * 0.3);
    const z = Math.sin(a) * r + rand(-spread, spread);
    // inclina o disco para ser visto quase de frente
    const t = 1.05;
    out.set([x, y * Math.cos(t) - z * Math.sin(t), y * Math.sin(t) + z * Math.cos(t)], i * 3);
  }
  return out;
}

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uVelocity;
  uniform vec2 uMouse;
  uniform float uGlitch;
  attribute vec3 aP0;
  attribute vec3 aP1;
  attribute vec3 aP2;
  attribute vec3 aP3;
  attribute vec3 aP4;
  attribute float aRand;
  varying float vRand;
  varying float vGlow;
  varying float vShift;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  vec3 shape(int i) {
    if (i <= 0) return aP0;
    if (i == 1) return aP1;
    if (i == 2) return aP2;
    if (i == 3) return aP3;
    return aP4;
  }

  void main() {
    float p = clamp(uProgress, 0.0, 4.0);
    int seg = int(min(floor(p), 3.0));
    float f = p - float(seg);
    // cada partícula começa a migrar num instante diferente => morph orgânico
    float delay = aRand * 0.35;
    float lf = smoothstep(delay, delay + 0.65, f);
    vec3 a = shape(seg);
    vec3 b = shape(seg + 1);
    vec3 pos = mix(a, b, lf);

    // explosão suave no meio da transição
    float burst = sin(lf * 3.14159);
    pos += normalize(pos + 0.0001) * burst * (0.35 + aRand * 0.9);

    // respiração + turbulência pela velocidade de scroll
    float wobble = 0.025 + min(abs(uVelocity) * 0.006, 0.18);
    pos += vec3(
      sin(uTime * 0.9 + aRand * 40.0),
      cos(uTime * 0.7 + aRand * 25.0),
      sin(uTime * 0.8 + aRand * 33.0)
    ) * wobble;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);

    // repulsão do mouse (em espaço de tela)
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = ndc - uMouse;
    float dist = length(d);
    float force = smoothstep(0.32, 0.0, dist);
    mv.xy += normalize(d + 0.0001) * force * 0.45;
    vGlow = force;

    vec4 outPos = projectionMatrix * mv;
    vShift = 0.0;
    // glitch: faixas horizontais deslocadas + posições "pixeladas" numa grade
    if (uGlitch > 0.001) {
      vec2 nd = outPos.xy / outPos.w;
      float tseed = floor(uTime * 24.0);
      float band = floor((nd.y + 1.0) * 16.0);
      float shift = step(0.55, hash(band * 13.7 + tseed)) * (hash(band + tseed * 3.1) - 0.5) * 0.6 * uGlitch;
      nd.x += shift;
      float px = 0.004 + 0.03 * uGlitch;
      nd = floor(nd / px + 0.5) * px;
      outPos.xy = nd * outPos.w;
      vShift = clamp(abs(shift) * 8.0 + uGlitch * 0.35, 0.0, 1.0);
    }
    gl_Position = outPos;
    gl_PointSize = uSize * uPixelRatio * (0.45 + aRand) * (1.0 / -mv.z) * (1.0 + force * 1.5 + uGlitch * 0.8);
    vRand = aRand;
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  uniform float uGlitch;
  varying float vRand;
  varying float vGlow;
  varying float vShift;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    // no glitch as partículas viram "pixels" quadrados
    float square = step(0.4, uGlitch);
    if (d > 0.5 && square < 0.5) discard;
    float alpha = mix(smoothstep(0.5, 0.0, d), 0.9, square);
    vec3 bone   = vec3(0.941, 0.922, 0.898);
    vec3 grey   = vec3(0.560, 0.545, 0.580);
    vec3 lime   = vec3(0.608, 0.886, 0.235);
    vec3 violet = vec3(0.620, 0.470, 1.000);
    vec3 col = vRand < 0.6 ? mix(grey, bone, vRand / 0.6) : (vRand < 0.88 ? lime : violet);
    col = mix(col, vec3(1.0), vGlow * 0.6);
    // separação RGB das faixas deslocadas
    vec3 split = vRand < 0.5 ? vec3(1.0, 0.2, 0.35) : vec3(0.25, 0.95, 1.0);
    col = mix(col, split, vShift * 0.85);
    gl_FragColor = vec4(col, alpha * uOpacity * (0.55 + vGlow));
  }
`;

export function initScene(canvas, { mobile = false, reduced = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    canvas.classList.add('is-fallback');
    return null;
  }
  // partículas não precisam de densidade 2x: no celular e em telas 2K/4K limita o custo de pixels
  const pr = Math.min(window.devicePixelRatio, mobile || window.innerWidth * window.devicePixelRatio > 2600 ? 1.5 : 2);
  renderer.setPixelRatio(pr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, mobile ? 8.5 : 6.5);

  const count = mobile ? 4500 : 11000;
  const geo = new THREE.BufferGeometry();
  const p0 = sphere(count);
  geo.setAttribute('position', new THREE.BufferAttribute(p0, 3));
  geo.setAttribute('aP0', new THREE.BufferAttribute(p0, 3));
  geo.setAttribute('aP1', new THREE.BufferAttribute(torusKnot(count), 3));
  geo.setAttribute('aP2', new THREE.BufferAttribute(cubeLattice(count), 3));
  geo.setAttribute('aP3', new THREE.BufferAttribute(helix(count), 3));
  geo.setAttribute('aP4', new THREE.BufferAttribute(galaxy(count), 3));
  const rnd = new Float32Array(count);
  for (let i = 0; i < count; i++) rnd[i] = Math.random();
  geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uSize: { value: mobile ? 34 : 30 },
    uPixelRatio: { value: pr },
    uVelocity: { value: 0 },
    uMouse: { value: new THREE.Vector2(9, 9) },
    uGlitch: { value: 0 },
    uOpacity: { value: 0 }
  };

  const mat = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  // estado animável por GSAP
  const state = { progress: 0, x: 0, opacity: 0, alpha: 1, velocity: 0, glitch: 0 };
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  // um redimensionamento por quadro no máximo (a barra do celular dispara vários eventos seguidos)
  let resizeRaf = 0;
  const onResize = () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  };
  window.addEventListener('resize', onResize);

  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    uniforms.uMouse.value.set(mouse.tx, mouse.ty);
  });
  // mouse fora da janela ou dedo fora da tela: as partículas voltam ao lugar
  const resetMouse = () => uniforms.uMouse.value.set(9, 9);
  document.documentElement.addEventListener('pointerleave', resetMouse);
  window.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') resetMouse(); });
  window.addEventListener('pointercancel', resetMouse);

  const clock = new THREE.Clock();
  let running = true;
  let rafId = 0;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    // cancela o quadro pendente antes de reiniciar: nunca há dois loops de renderização
    cancelAnimationFrame(rafId);
    if (running) { clock.getDelta(); tick(); }
  });

  function tick() {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    uniforms.uTime.value = reduced ? 0 : t;
    uniforms.uProgress.value = state.progress;
    uniforms.uOpacity.value = state.opacity * state.alpha;
    uniforms.uGlitch.value = reduced ? 0 : state.glitch;
    uniforms.uVelocity.value += (state.velocity - uniforms.uVelocity.value) * 0.1;

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    const xShift = mobile ? 0 : state.x;
    group.position.x += (xShift - group.position.x) * 0.06;
    // o scroll empurra o giro (no sentido da rolagem): a cena reage mesmo com a página "presa" num pin
    const v = uniforms.uVelocity.value;
    const scrollSpin = reduced ? 0 : THREE.MathUtils.clamp(v * 0.06, -2.5, 2.5);
    group.rotation.y += dt * ((reduced ? 0 : 0.12) + scrollSpin);
    const scrollTilt = reduced ? 0 : THREE.MathUtils.clamp(v * 0.006, -0.3, 0.3);
    group.rotation.x += (mouse.y * 0.25 + scrollTilt - group.rotation.x) * 0.05;
    group.rotation.z += (-mouse.x * 0.08 - group.rotation.z) * 0.05;

    // invisível (durante o loader) não precisa desenhar
    if (uniforms.uOpacity.value > 0.001) renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }
  tick();

  return {
    state,
    goTo(shape, x = 0, alpha = 1) {
      window.gsap.to(state, { progress: shape, x, alpha, duration: 2.2, ease: 'power3.inOut', overwrite: 'auto' });
    },
    // glitch rápido (sobe 350ms, desce 450ms); onPeak roda no auge, ideal para trocar a forma
    glitch(onPeak) {
      const gsap = window.gsap;
      gsap.killTweensOf(state, 'glitch');
      gsap.timeline()
        .to(state, { glitch: 1, duration: 0.35, ease: 'power2.in' })
        .add(() => onPeak?.())
        .to(state, { glitch: 0, duration: 0.45, ease: 'power2.out' });
    },
    fadeIn() {
      window.gsap.to(state, { opacity: 1, duration: 2.4, ease: 'power2.out' });
    },
    setVelocity(v) { state.velocity = v; }
  };
}
