// =========================================================
// PLANTILLA "LOVE" — edita las 2 líneas marcadas con ✏️ abajo
// =========================================================

// ✏️ 1) Cambia la pregunta inicial
const QUESTION_TEXT = "Vdd que quieres 2 hijos uno llamado leo y el otro messi🙈";

// ✏️ 2) Cambia el mensaje final que aparece al presionar "Sí"
const FINAL_MESSAGE = "te amo gracias por darme a leo";

document.getElementById('questionText').textContent = QUESTION_TEXT;
document.getElementById('finalMessage').textContent = FINAL_MESSAGE;

// ---------- Fondo de corazones flotando ----------
const bgHearts = document.getElementById('bgHearts');
const HEART_COUNT = 18;
for (let i = 0; i < HEART_COUNT; i++) {
  const h = document.createElement('span');
  h.textContent = '♥';
  h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = (12 + Math.random() * 16) + 'px';
  h.style.animationDuration = (6 + Math.random() * 8) + 's';
  h.style.animationDelay = (Math.random() * 8) + 's';
  bgHearts.appendChild(h);
}

// ---------- Botón "No" que esquiva el cursor ----------
const btnNo = document.getElementById('btnNo');
const buttonsWrap = document.querySelector('.buttons');

function dodge() {
  const wrapRect = buttonsWrap.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const maxX = wrapRect.width - btnRect.width;
  const maxY = 40; // rango vertical de movimiento

  const randX = Math.random() * maxX - maxX / 2;
  const randY = Math.random() * maxY - maxY / 2;

  btnNo.style.position = 'absolute';
  btnNo.style.left = `calc(50% + ${randX}px)`;
  btnNo.style.top = `${randY}px`;
  btnNo.style.transform = 'translateX(-50%)';
}

// se mueve cuando el mouse se acerca
buttonsWrap.addEventListener('mousemove', (e) => {
  const btnRect = btnNo.getBoundingClientRect();
  const cx = btnRect.left + btnRect.width / 2;
  const cy = btnRect.top + btnRect.height / 2;
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
  if (dist < 90) dodge();
});

// soporte táctil: si lo tocan, también escapa
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  dodge();
});

// por si alguna vez lo "atrapan", igual no deja avanzar
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  dodge();
});

// ---------- Botón "Sí": explosión de corazones + cambio de pantalla ----------
const btnYes = document.getElementById('btnYes');
const screenAsk = document.getElementById('screenAsk');
const screenYes = document.getElementById('screenYes');
const btnAgain = document.getElementById('btnAgain');

function rainHearts() {
  const symbols = ['♥', '💗', '💕'];
  for (let i = 0; i < 26; i++) {
    const h = document.createElement('span');
    h.className = 'burst-heart';
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 260;
    h.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    h.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    h.style.color = `hsl(${340 + Math.random() * 20}, 80%, ${55 + Math.random() * 15}%)`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}

btnYes.addEventListener('click', () => {
  rainHearts();
  screenAsk.classList.add('screen-hidden');
  screenYes.classList.remove('screen-hidden');
});

btnAgain.addEventListener('click', () => {
  screenYes.classList.add('screen-hidden');
  screenAsk.classList.remove('screen-hidden');
  btnNo.style.left = '';
  btnNo.style.top = '';
  btnNo.style.transform = 'translateX(-70px)';
});
