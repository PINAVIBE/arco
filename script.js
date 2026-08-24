// =========================================================
// Animación del tulipán, controlada 100% por JavaScript
// (Web Animations API — más confiable en SVG que CSS puro)
// =========================================================

const EASE = 'cubic-bezier(.3,.8,.3,1)';
const EASE_BLOOM = 'cubic-bezier(.25,.9,.3,1.15)';

const stem = document.getElementById('stem');
const leafLeft = document.getElementById('leafLeft');
const leafRight = document.getElementById('leafRight');
const flowerGroup = document.getElementById('flowerGroup');
const hint = document.getElementById('replayHint');

const petals = {
  backLeft:  document.querySelector('.petal-back[data-side="left"]'),
  backRight: document.querySelector('.petal-back[data-side="right"]'),
  midLeft:   document.querySelector('.petal-mid[data-side="left"]'),
  midRight:  document.querySelector('.petal-mid[data-side="right"]'),
  front:     document.querySelector('.petal-front'),
};

let swayAnim = null;
let running = false;

function cancelAll() {
  [stem, leafLeft, leafRight, flowerGroup, ...Object.values(petals)]
    .forEach(el => el.getAnimations().forEach(a => a.cancel()));
  if (swayAnim) { swayAnim.cancel(); swayAnim = null; }
}

function bloom() {
  if (running) return;
  running = true;
  cancelAll();
  hint.classList.remove('visible');

  // 1) tallo creciendo
  stem.animate(
    [{ strokeDashoffset: 450 }, { strokeDashoffset: 0 }],
    { duration: 1600, easing: EASE, fill: 'forwards' }
  );

  // 2) la flor sube junto con la punta del tallo
  flowerGroup.animate(
    [
      { transform: 'translate(200px,690px) scale(.15)' },
      { transform: 'translate(200px,320px) scale(1)' }
    ],
    { duration: 1600, easing: EASE, fill: 'forwards' }
  );

  // 3) hojas desenrollándose
  leafLeft.animate(
    [
      { transform: 'scale(0) rotate(-25deg)', opacity: 0 },
      { transform: 'scale(1.1) rotate(4deg)',  opacity: 1, offset: .6 },
      { transform: 'scale(1) rotate(0deg)',    opacity: 1 }
    ],
    { duration: 1000, delay: 700, easing: 'ease-out', fill: 'forwards' }
  );

  leafRight.animate(
    [
      { transform: 'scale(0) rotate(25deg)', opacity: 0 },
      { transform: 'scale(1.1) rotate(-4deg)', opacity: 1, offset: .6 },
      { transform: 'scale(1) rotate(0deg)',    opacity: 1 }
    ],
    { duration: 1000, delay: 1000, easing: 'ease-out', fill: 'forwards' }
  );

  // 4) pétalos abriendo en capas (traseros -> laterales -> frontal)
  petals.backLeft.animate(
    [
      { transform: 'rotate(0deg) scale(.15)', opacity: 0 },
      { transform: 'rotate(-34deg) scale(1.05)', opacity: 1, offset: .7 },
      { transform: 'rotate(-26deg) scale(1)', opacity: 1 }
    ],
    { duration: 1400, delay: 1500, easing: EASE_BLOOM, fill: 'forwards' }
  );

  petals.backRight.animate(
    [
      { transform: 'rotate(0deg) scale(.15)', opacity: 0 },
      { transform: 'rotate(34deg) scale(1.05)', opacity: 1, offset: .7 },
      { transform: 'rotate(26deg) scale(1)', opacity: 1 }
    ],
    { duration: 1400, delay: 1500, easing: EASE_BLOOM, fill: 'forwards' }
  );

  petals.midLeft.animate(
    [
      { transform: 'rotate(0deg) scale(.15)', opacity: 0 },
      { transform: 'rotate(-18deg) scale(1.05)', opacity: 1, offset: .7 },
      { transform: 'rotate(-13deg) scale(1)', opacity: 1 }
    ],
    { duration: 1400, delay: 1650, easing: EASE_BLOOM, fill: 'forwards' }
  );

  petals.midRight.animate(
    [
      { transform: 'rotate(0deg) scale(.15)', opacity: 0 },
      { transform: 'rotate(18deg) scale(1.05)', opacity: 1, offset: .7 },
      { transform: 'rotate(13deg) scale(1)', opacity: 1 }
    ],
    { duration: 1400, delay: 1650, easing: EASE_BLOOM, fill: 'forwards' }
  );

  const frontAnim = petals.front.animate(
    [
      { transform: 'scale(.1)', opacity: 0 },
      { transform: 'scale(1.08)', opacity: 1, offset: .7 },
      { transform: 'scale(1)', opacity: 1 }
    ],
    { duration: 1400, delay: 1800, easing: EASE_BLOOM, fill: 'forwards' }
  );

  // 5) al terminar: balanceo suave continuo + habilitar "tocar para reiniciar"
  frontAnim.onfinish = () => {
    swayAnim = flowerGroup.animate(
      [
        { transform: 'translate(200px,320px) rotate(0deg)' },
        { transform: 'translate(200px,320px) rotate(2deg)' },
        { transform: 'translate(200px,320px) rotate(0deg)' }
      ],
      { duration: 4000, easing: 'ease-in-out', iterations: Infinity }
    );
    hint.classList.add('visible');
    running = false;
  };
}

// primer florecimiento al cargar
bloom();

// tocar/clic en cualquier parte reinicia la animación
document.addEventListener('click', bloom);
document.addEventListener('touchstart', bloom, { passive: true });
