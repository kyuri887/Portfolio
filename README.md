# Portfólio — Kauan Iury

Portfólio interativo em 3D: partículas em WebGL (Three.js) que mudam de forma a cada capítulo, animações com GSAP + ScrollTrigger e rolagem suave com Lenis. É um site 100% estático: não precisa de build nem de Node, então roda direto no GitHub Pages.

## Estrutura

```
index.html        → conteúdo e estrutura das seções
css/style.css     → visual (cores no topo, em :root)
js/main.js        → interações + DADOS (projetos, API, frases, contato)
js/scene.js       → cena 3D de partículas
js/chess.js       → xadrez interativo (regras completas + IA simples)
js/sound.js       → efeitos sonoros sintetizados (Web Audio, sem arquivos)
assets/           → foto, avatar, favicon
.nojekyll         → faz o GitHub Pages servir os arquivos como estão
.gitattributes    → mantém quebras de linha LF (necessário para a CSP, ver "Segurança")
```

## Editar o conteúdo

- **Projetos, endpoints da API, frases do carregamento e e-mail**: no topo de `js/main.js` (`PROFILE`, `PROJECTS`, `ENDPOINTS`, `QUOTES`).
- **Duração da tela de carregamento**: `LOADER_DURATION` em `js/main.js` (em milissegundos).
- **Textos do sobre, trajetória, faixa de tecnologias e contato**: em `index.html`.
- **Cores**: variáveis `--lime`, `--yellow`, `--violet` e `--bg` em `css/style.css`.
- **Foto**: troque `assets/kauan-cutout.webp` e `assets/kauan-cutout.png` (foto quadrada com fundo removido). `assets/kauan.jpg` é a imagem de prévia ao compartilhar o link.
- **Avatar** (topo e tela de carregamento): `assets/avatar.webp` e `assets/avatar.png`.
- **Prévia em redes sociais**: depois de publicar, troque o `content` de `og:image` no `index.html` pela URL completa (ex.: `https://SEU-USUARIO.github.io/portfolio/assets/kauan.jpg`). LinkedIn e WhatsApp só leem URL absoluta.

## Rodar localmente

Como usa módulos ES, o site precisa ser aberto por um servidor (abrir o arquivo com duplo clique não funciona):

```bash
python -m http.server 5173
# abra http://localhost:5173
```

## Publicar no GitHub Pages (grátis)

1. Crie um repositório **vazio** no GitHub, por exemplo `portfolio` (sem README, sem .gitignore). Se o nome for `SEU-USUARIO.github.io`, o site fica na raiz do domínio.
2. Esta pasta já é um repositório Git (branch `main`). Dentro dela, rode:
   ```bash
   git add .
   git commit -m "Portfólio inicial"
   git remote add origin https://github.com/SEU-USUARIO/portfolio.git
   git push -u origin main
   ```
3. No GitHub, abra **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
4. Em 1 ou 2 minutos o site estará em `https://SEU-USUARIO.github.io/portfolio/`.

## Segurança

- **Content-Security-Policy** (meta tag no `index.html`): scripts só do próprio site e de cdnjs, unpkg e jsDelivr; fontes só do Google Fonts; sem plugins, sem formulários externos.
- **Sem scripts inline** além do `importmap` (liberado pelo hash na CSP).
- **Links externos** com `rel="noopener noreferrer"`.
- **Subresource Integrity (SRI)**: GSAP, ScrollTrigger, Lenis e Three.js (build minificado) têm o hash fixado. Se um CDN for adulterado, o navegador recusa o arquivo.
- **Ao trocar a versão de uma biblioteca**, atualize o `integrity` correspondente (gere em https://www.srihash.org). Se mexer no `<script type="importmap">`, recalcule também o hash `sha256-…` dele dentro da CSP, senão o navegador bloqueia a cena 3D.

## Recursos

- Tela de carregamento de 7 s com avatar interativo (segue o mouse; clique troca a frase) e frases de cientistas e programadores sobre inovação
- Cena 3D de partículas que vira esfera → nó → cubo → DNA → galáxia, reage ao mouse e à velocidade da rolagem
- Faixa de tecnologias que segura a rolagem até todas passarem
- Navegação lateral por capítulos (pontos), barra de progresso e rolagem suave com duração proporcional à distância
- Animações de entrada que tocam de novo toda vez que a seção aparece
- Cursor personalizado com rótulos contextuais e botões magnéticos
- Foto com tilt 3D, brilho e chips com parallax
- Texto que "acende" palavra por palavra e números animados
- Seletor de projetos estilo HUD (lista no desktop, faixa deslizável no celular) com glitch na cena 3D
- Xadrez jogável contra uma IA simples (arrastar ou tocar)
- Playground de API: controller Spring Boot de cada endpoint e resposta JSON ao clicar em **Request** (ou Ctrl + Enter)
- Linha do tempo desenhada pela rolagem
- Contato direto por LinkedIn, WhatsApp e e-mail, e relógio de Santo André ao vivo
- Responsivo de 320px a 2560px (inclusive celular deitado), alvos de toque de 44px, navegável pelo teclado e com suporte a `prefers-reduced-motion`
