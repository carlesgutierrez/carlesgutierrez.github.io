/* ==========================================================================
   ADN GENERATIVE SYSTEM & PHYSICS SKETCH (p5.js) - LIGHT MODE & EDGES EDITION
   ========================================================================== */

// 1. Generador Pseudoaleatorio Determinista (Mulberry32 PRNG)
function createMulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Semilla Global de la Sesión (combinada con Date.now() para garantizar unicidad absoluta entre recargas)
window.sessionSeed = (Math.floor(Math.random() * 500000) + 1) + (Date.now() % 500000);

// 2. Configuración de ADN y Ensamblaje por Sección (Escala de Grises)
const configADNSections = {
  section_branding: {
    shapesCount: 6,
    shapeTypes: ['circle', 'rect', 'triangle'],
    gravity: 0.22,
    colors: ['#111111', '#444444', '#777777', '#aaaaaa', '#cccccc', '#e8e8e8'],
    assemblyType: 'vertical_stack',
    scaleMultiplier: 1.0
  },
  section_web: {
    shapesCount: 8,
    shapeTypes: ['rect'],
    gravity: 0.32,
    colors: ['#111111', '#333333', '#666666', '#999999', '#bbbbbb', '#e0e0e0'],
    assemblyType: 'grid_block',
    scaleMultiplier: 1.1
  },
  section_reservas: {
    shapesCount: 7,
    shapeTypes: ['circle', 'rect'],
    gravity: 0.18,
    colors: ['#222222', '#555555', '#888888', '#aaaaaa', '#d0d0d0', '#eeeeee'],
    assemblyType: 'circular_ring',
    scaleMultiplier: 0.95
  },
  section_marketing: {
    shapesCount: 9,
    shapeTypes: ['triangle', 'circle'],
    gravity: 0.28,
    colors: ['#111111', '#444444', '#777777', '#999999', '#cccccc', '#e5e5e5'],
    assemblyType: 'arrow_growth',
    scaleMultiplier: 1.05
  },
  section_docencia: {
    shapesCount: 8,
    shapeTypes: ['rect', 'circle'],
    gravity: 0.25,
    colors: ['#1a1a1a', '#3d3d3d', '#666666', '#8f8f8f', '#b8b8b8', '#e2e2e2'],
    assemblyType: 'grid_block',
    scaleMultiplier: 1.0
  }
};

// 3. Factoría del Lienzo Físico p5.js
function initADNPhysics(containerId, sectionKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const sectionConfig = configADNSections[sectionKey];
  let sectionSeed = window.sessionSeed + sectionKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  let currentP5Instance = null;

  function createSketch(seed) {
    if (currentP5Instance) {
      currentP5Instance.remove();
    }
    const rand = createMulberry32(seed);

  // Instancia p5.js
  const sketch = (p) => {
    let shapes = [];
    let state = 'FALLING'; // 'FALLING', 'MORPHING', 'STATIC'
    let morphProgress = 0;
    let floorY = 390;      // Suelo de colisión (dinámico)
    let center;            // Centro del canvas para imantar

    p.setup = () => {
      const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.parent(containerId);
      p.rectMode(p.CENTER);
      p.noStroke();
      
      // Suelo dinámico a 25px de la base real del canvas
      floorY = p.height - 25;
      
      center = p.createVector(p.width / 2, floorY - 80);
      p.generateShapes();
      
      p.noLoop();
    };

    p.generateShapes = () => {
      const count = sectionConfig.shapesCount;
      const types = sectionConfig.shapeTypes;
      const colors = sectionConfig.colors;

      for (let i = 0; i < count; i++) {
        const type = types[Math.floor(rand() * types.length)];
        const colorHex = colors[Math.floor(rand() * colors.length)];
        const size = (25 + rand() * 20) * sectionConfig.scaleMultiplier;
        
        const x = p.width / 2 + (rand() - 0.5) * 160;
        const y = -size - (rand() * 150);
        
        shapes.push({
          type: type,
          color: colorHex,
          size: size,
          
          // Físicas iniciales
          pos: p.createVector(x, y),
          vel: p.createVector((rand() - 0.5) * 3, 2),
          rotation: rand() * p.TWO_PI,
          angVel: (rand() - 0.5) * 0.08,
          
          // Targets para la imantación
          targetPos: p.createVector(0, 0),
          targetRotation: 0,
          
          morphStartPos: p.createVector(0, 0),
          morphStartRot: 0,
          
          settled: false
        });
      }
      p.calculateAssemblyTargets();
    };

    p.calculateAssemblyTargets = () => {
      const type = sectionConfig.assemblyType;
      const count = shapes.length;

      if (type === 'vertical_stack') {
        // 1. APILAMIENTO VERTICAL (Sin solapamiento):
        // Calculamos la posición acumulada según el tamaño de cada forma para que se apilen tocándose perfectamente.
        let currentY = floorY - 5;
        for (let i = 0; i < count; i++) {
          let sh = shapes[i];
          sh.targetPos.x = center.x;
          sh.targetPos.y = currentY - sh.size / 2;
          sh.targetRotation = (i % 2 === 0) ? 0 : 0.08; // Pequeña rotación orgánica
          currentY -= sh.size + 4; // Desplazamiento exacto con un pequeño gap de 4px
        }
      } 
      else if (type === 'grid_block') {
        // 2. REJILLA MODULAR DE CANTOS VIVOS (Sin solapamiento):
        const cols = 3;
        const spacing = 38; // Espaciado entre elementos basado en el tamaño promedio
        const startX = center.x - (cols - 1) * spacing / 2;
        const startY = floorY - 15;
        
        for (let i = 0; i < count; i++) {
          let sh = shapes[i];
          let col = i % cols;
          let row = Math.floor(i / cols);
          sh.targetPos.x = startX + col * spacing;
          sh.targetPos.y = startY - row * spacing;
          sh.targetRotation = (col % 2 === 0) ? 0 : p.HALF_PI; // Rotación recta de 90 grados
        }
      } 
      else if (type === 'circular_ring') {
        // 3. ANILLO CONCÉNTRICO (Sin solapamiento):
        // Colocados en órbita con un radio lo suficientemente amplio para que no se pisen.
        const radius = 62;
        for (let i = 0; i < count; i++) {
          let sh = shapes[i];
          const angle = (p.TWO_PI / count) * i;
          sh.targetPos.x = center.x + p.cos(angle) * radius;
          sh.targetPos.y = center.y + p.sin(angle) * radius;
          sh.targetRotation = angle;
        }
      } 
      else if (type === 'arrow_growth') {
        // 4. PIRÁMIDE EXPANSIVA (Sin solapamiento):
        // Base (4 piezas), Media (3 piezas), Top (2 piezas), apiladas perfectamente.
        for (let i = 0; i < count; i++) {
          let sh = shapes[i];
          sh.targetRotation = 0;
          
          if (i < 4) { // Fila base
            sh.targetPos.x = center.x - 60 + i * 40;
            sh.targetPos.y = floorY - sh.size / 2 - 5;
          } else if (i < 7) { // Fila intermedia
            sh.targetPos.x = center.x - 40 + (i - 4) * 40;
            sh.targetPos.y = floorY - sh.size - sh.size / 2 - 10;
          } else { // Cúspide
            sh.targetPos.x = center.x - 20 + (i - 7) * 40;
            sh.targetPos.y = floorY - sh.size * 2 - sh.size / 2 - 15;
          }
        }
      }
    };

    p.draw = () => {
      p.clear();
      
      // Suelo de la sección en gris muy suave
      p.fill('rgba(0,0,0,0.02)');
      p.rect(p.width / 2, floorY + 10, p.width, 20);

      let allSettled = true;

      shapes.forEach((sh) => {
        if (state === 'FALLING') {
          sh.vel.y += sectionConfig.gravity;
          sh.vel.x *= 0.98;
          sh.vel.y *= 0.98;
          
          sh.pos.add(sh.vel);
          sh.rotation += sh.angVel;

          // Colisión contra el suelo
          const halfSize = sh.size / 2;
          if (sh.pos.y + halfSize >= floorY) {
            sh.pos.y = floorY - halfSize;
            sh.vel.y *= -0.32; // Rebote suave
            sh.vel.x *= 0.8;
            sh.angVel *= -0.4;
          }

          // Colisión lateral
          if (sh.pos.x - halfSize < 10) {
            sh.pos.x = 10 + halfSize;
            sh.vel.x *= -0.5;
          } else if (sh.pos.x + halfSize > p.width - 10) {
            sh.pos.x = p.width - 10 - halfSize;
            sh.vel.x *= -0.5;
          }

          // Detección de reposo
          if (p.abs(sh.vel.y) < 0.15 && p.abs(sh.vel.x) < 0.15 && p.abs(sh.pos.y - (floorY - halfSize)) < 2) {
            sh.settled = true;
          } else {
            allSettled = false;
          }
        } 
        else if (state === 'MORPHING') {
          // LERP de posiciones
          sh.pos.x = p.lerp(sh.morphStartPos.x, sh.targetPos.x, morphProgress);
          sh.pos.y = p.lerp(sh.morphStartPos.y, sh.targetPos.y, morphProgress);
          
          // Animación de rotación premium:
          // A medida que se imantan y colisionan magnéticamente, aplicamos un sutil efecto de oscilación senoidal
          // que decrece con el tiempo para simular que "chocan y vibran levemente antes de quedar rígidas".
          // Esto evita que roten mecánicamente.
          const wobble = p.sin(morphProgress * p.PI * 2.5) * (1.0 - morphProgress) * 0.16;
          sh.rotation = p.lerp(sh.morphStartRot, sh.targetRotation, morphProgress) + wobble;
        }

        // Renderizado del elemento con CANTO VIVO (sin redondeados)
        p.fill(sh.color);
        p.push();
        p.translate(sh.pos.x, sh.pos.y);
        p.rotate(sh.rotation);

        if (sh.type === 'circle') {
          p.ellipse(0, 0, sh.size, sh.size);
        } else if (sh.type === 'rect') {
          // Canto vivo: sin argumento de radio de esquina
          p.rect(0, 0, sh.size, sh.size);
        } else if (sh.type === 'triangle') {
          const s = sh.size / 2;
          p.triangle(0, -s, -s, s, s, s);
        }
        p.pop();
      });

      // Lógica de transición de estados
      if (state === 'FALLING' && allSettled) {
        state = 'MORPHING';
        morphProgress = 0;
        shapes.forEach((sh) => {
          sh.morphStartPos = sh.pos.copy();
          sh.morphStartRot = sh.rotation;
        });
      }

      if (state === 'MORPHING') {
        morphProgress += 0.015; // Morphing suave y de alta gama
        if (morphProgress >= 1) {
          morphProgress = 1;
          state = 'STATIC';
          p.noLoop();
          console.log(`[ADN Physics] Escultura ${sectionKey} imantada estática.`);
        }
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
      floorY = p.height - 25;
      center = p.createVector(p.width / 2, floorY - 80);
      p.calculateAssemblyTargets();
      if (state === 'STATIC') {
        p.redraw();
      }
    };
  };

    currentP5Instance = new p5(sketch);
    return currentP5Instance;
  }

  // Click para re-sembrar y reiniciar la animación
  container.style.cursor = 'pointer';
  container.addEventListener('click', () => {
    sectionSeed = Math.floor(Math.random() * 999999) + 1;
    const newSketch = createSketch(sectionSeed);
    if (window.adnSketches) {
      window.adnSketches[sectionKey] = newSketch;
    }
    // Hacemos que la nueva animación arranque inmediatamente
    if (newSketch && typeof newSketch.loop === 'function') {
      newSketch.loop();
    }
  });

  return createSketch(sectionSeed);
}

// Registro y Control de los Sketches
window.adnSketches = {};

function initAllADNSketches() {
  const skList = [
    { id: 'canvas-branding', key: 'section_branding' },
    { id: 'canvas-web', key: 'section_web' },
    { id: 'canvas-reservas', key: 'section_reservas' },
    { id: 'canvas-marketing', key: 'section_marketing' },
    { id: 'canvas-docencia', key: 'section_docencia' }
  ];

  skList.forEach((item) => {
    window.adnSketches[item.key] = initADNPhysics(item.id, item.key);
  });
}
