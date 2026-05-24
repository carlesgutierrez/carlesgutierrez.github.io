/* ==========================================================================
   CARLES GUTIÉRREZ - RURAL DIGITAL CONSULTING LÓGICA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────────────────────────────────
  // 1. LOGO GLITCH ANIMADO
  //    Escribe carácter a carácter con efecto de "descodificación"
  // ─────────────────────────────────────────────────────────────────────────
  const GLITCH_CHARS = '!@#$%^&*_=+-~<>?/|\\[]{}0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const LOGO_TEXT    = 'CARLES GUTIÉRREZ';
  const logoEl       = document.getElementById('brand-logo');

  function pickGlitch() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }

  function renderLogo(resolvedUpTo, glitchChar, insertAt) {
    if (!logoEl) return;
    let html = '';
    for (let i = 0; i < LOGO_TEXT.length; i++) {
      if (i < resolvedUpTo) {
        html += `<span class="logo-char">${LOGO_TEXT[i] === ' ' ? '&nbsp;' : LOGO_TEXT[i]}</span>`;
      } else if (i === insertAt) {
        html += `<span class="logo-char glitch">${glitchChar}</span>`;
      } else {
        html += `<span class="logo-char" style="opacity:0">${LOGO_TEXT[i]}</span>`;
      }
    }
    logoEl.innerHTML = html;
  }

  function animateLogo() {
    let resolved = 0;
    const GLITCH_FRAMES = 6;   // cuántos frames de ruido antes de revelar cada carácter
    const FRAME_MS      = 45;  // velocidad por frame

    function step() {
      if (resolved >= LOGO_TEXT.length) {
        renderLogo(LOGO_TEXT.length, '', -1); // todo revelado, limpio
        return;
      }

      let frame = 0;
      const interval = setInterval(() => {
        renderLogo(resolved, pickGlitch(), resolved);
        frame++;
        if (frame >= GLITCH_FRAMES) {
          clearInterval(interval);
          resolved++;
          step();
        }
      }, FRAME_MS);
    }

    step();
  }

  animateLogo();

  // ─────────────────────────────────────────────────────────────────────────
  // 2. CARRUSEL TIPOGRÁFICO DEL HERO
  // ─────────────────────────────────────────────────────────────────────────
  const carruselItems = document.querySelectorAll('.carrusel-item');
  let currentCarruselIndex = 0;

  function rotateCarrusel() {
    carruselItems[currentCarruselIndex].classList.remove('active');
    currentCarruselIndex = (currentCarruselIndex + 1) % carruselItems.length;
    carruselItems[currentCarruselIndex].classList.add('active');
  }
  setInterval(rotateCarrusel, 3500);

  // ─────────────────────────────────────────────────────────────────────────
  // 3. EMAIL SEGURO ANTI-SPAM
  // ─────────────────────────────────────────────────────────────────────────
  const btnShowEmail = document.getElementById('btn-show-email');
  const emailWrapper = btnShowEmail ? btnShowEmail.parentElement : null;

  if (btnShowEmail && emailWrapper) {
    btnShowEmail.addEventListener('click', () => {
      const user      = 'carles.gutierrez';
      const domain    = 'gmail.com';
      const fullEmail = `${user}@${domain}`;

      // Reemplaza el botón por un contenedor con el email visible y un botón de copiar
      emailWrapper.innerHTML = `
        <span class="email-label">¿Hablamos sobre un proyecto?</span>
        <div class="email-revealed-box">
          <span class="email-address-text" id="email-address-text">${fullEmail}</span>
          <button class="email-copy-action-btn" id="btn-copy-email">Copiar</button>
        </div>
      `;

      // Añadimos la funcionalidad de copiar
      const btnCopy = document.getElementById('btn-copy-email');
      if (btnCopy) {
        btnCopy.addEventListener('click', () => {
          navigator.clipboard.writeText(fullEmail).then(() => {
            btnCopy.textContent = '¡Copiado!';
            btnCopy.classList.add('copied');
            setTimeout(() => {
              btnCopy.textContent = 'Copiar';
              btnCopy.classList.remove('copied');
            }, 2000);
          }).catch(err => {
            console.error('Error al copiar: ', err);
          });
        });
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. NAVEGACIÓN ACTIVA EN SCROLL
  // ─────────────────────────────────────────────────────────────────────────
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentActive = 'hero';
    const scrollPos   = window.scrollY + 140;

    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) {
        currentActive = sec.id;
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      const href = item.getAttribute('href').replace('#', '');
      if (currentActive === 'con-contacto' && href === 'con-contacto') {
        item.classList.add('active');
      } else if (currentActive !== 'con-contacto' && href === 'consultor-ia') {
        item.classList.add('active');
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 5. INICIALIZACIÓN DE FÍSICA p5.js + OBSERVER DE VIEWPORT
  // ─────────────────────────────────────────────────────────────────────────
  if (typeof initAllADNSketches === 'function') {
    initAllADNSketches();
  }

  const observerOptions = {
    root: null,
    rootMargin: '-15% 0px -15% 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const adnKey = entry.target.getAttribute('data-adn');
        if (adnKey && window.adnSketches && window.adnSketches[adnKey]) {
          const sketch = window.adnSketches[adnKey];
          if (sketch && typeof sketch.loop === 'function') {
            sketch.loop();
          }
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.adn-block-wrapper').forEach((block, idx) => {
    block.id = `block-adn-${idx}`;
    observer.observe(block);
  });

  const contactSec = document.getElementById('con-contacto');
  if (contactSec) observer.observe(contactSec);

  // ─────────────────────────────────────────────────────────────────────────
  // 6. WORD DE FONDO EN SCROLL
  // ─────────────────────────────────────────────────────────────────────────
  const bgWord = document.getElementById('bg-word');
  window.addEventListener('scroll', () => {
    if (bgWord) {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      bgWord.style.transform = `translateX(${-scrollPercent * 60}px)`;
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 7. INYECCIÓN DINÁMICA DE ICONO DE FLIP (SVG GRIS) Y COMPORTAMIENTO DE CLICK
  // ─────────────────────────────────────────────────────────────────────────
  const flipIconHtml = `
    <div class="flip-icon-container" title="Hacer click para girar tarjeta">
      <svg class="flip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
        <path d="M21 3v5h-5"></path>
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        <path d="M3 21v-5h5"></path>
      </svg>
    </div>
  `;

  document.querySelectorAll('.product-card').forEach((card) => {
    // Inyectamos el icono en las dos caras de la tarjeta
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    if (front) front.insertAdjacentHTML('beforeend', flipIconHtml);
    if (back) back.insertAdjacentHTML('beforeend', flipIconHtml);

    // Lógica para voltear la tarjeta con el click
    card.addEventListener('click', (e) => {
      // Si el click fue en un enlace/botón interno, no interferimos
      if (e.target.tagName === 'A' && e.target !== card) {
        return;
      }

      const isFlipped = card.classList.contains('flipped');

      // Des-voltear cualquier otra tarjeta que esté volteada en la web
      document.querySelectorAll('.product-card').forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove('flipped');
        }
      });

      if (card.classList.contains('clickable-card')) {
        // Tarjetas que enlazan externamente (ej: Histórico de Workshops, Instalaciones)
        if (!isFlipped) {
          e.preventDefault();
          card.classList.add('flipped');
        }
        // Si ya está volteada (flipped), el click se procesa normalmente y abre el enlace
      } else {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

});

/* ==========================================================================
   FUTURE DEVELOPMENT ROADMAP (TODO)
   ==========================================================================
   [ ] TODO: Chatbot LLM personalizado tipo "asistente de Carles"
       - Servidor local (Ollama / Llama.cpp) en Raspberry Pi 5 o VPS
       - Sistema RAG con embeddings del CV + servicios (ChromaDB / HNSWLib)
       - Prompt de sistema con personalidad amable, rural y profesional
       - Interfaz chat tipo LLM (streaming token a token, teletipo)
       - Re-habilitar contenedores .chat-body y .chat-options en index.html
       - Conectar fetch('/api/chat') al servidor local
   ========================================================================== */
