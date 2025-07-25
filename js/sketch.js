const container = document.getElementById('textContainer');
const lines = container.querySelectorAll('.line');

let isDragging = false;
let dragX = window.innerWidth / 2;
let dragY = window.innerHeight / 2;

function updateSpacing(x, y) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxDist = Math.hypot(centerX, centerY);
  const dist = Math.hypot(x - centerX, y - centerY);
  const ratio = Math.min(dist / maxDist, 1);

  const letterSpacing = (-0.6 + 0.6 * ratio).toFixed(2) + 'em';
  const lineHeight = (0.1 + 1.5 * ratio).toFixed(2);
  const fontSize = (120 - 48 * ratio).toFixed(2) + 'px';  // 중심 100px, 멀면 72px

  lines.forEach(line => {
    line.style.letterSpacing = letterSpacing;
    line.style.lineHeight = lineHeight;
    line.style.fontSize = fontSize;
  });
}

function startDrag(e) {
  isDragging = true;
  const point = e.touches ? e.touches[0] : e;
  dragX = point.clientX;
  dragY = point.clientY;
  updateSpacing(dragX, dragY);
}

function duringDrag(e) {
  if (!isDragging) return;
  const point = e.touches ? e.touches[0] : e;
  dragX = point.clientX;
  dragY = point.clientY;
  updateSpacing(dragX, dragY);
}

function endDrag() {
  isDragging = false;
}

window.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', duringDrag);
window.addEventListener('mouseup', endDrag);

window.addEventListener('touchstart', startDrag);
window.addEventListener('touchmove', duringDrag);
window.addEventListener('touchend', endDrag);
