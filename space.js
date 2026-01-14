const canvas = document.getElementById("space-bg");
const ctx = canvas.getContext("2d");

/* ================== CONFIG ================== */
const STAR_COUNT = 120;
const COMET_CHANCE = 0.003;

let stars = [];
let comets = [];

/* (You referenced planets previously; declare it to avoid errors) */
let planets = [];

/* ================== RESIZE ================== */
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ================== FACTORIES ================== */
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.4 + 0.3,
    speedX: (Math.random() - 0.5) * 0.05,
    speedY: (Math.random() - 0.5) * 0.05,
    alpha: Math.random() * 0.5 + 0.5
  };
}

function createComet() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.3,
    vx: Math.random() * 6 + 6,
    vy: Math.random() * 2 + 2,
    life: 0
  };
}

/* ================== INIT ================== */
function init() {
  stars = [];
  planets = [];
  comets = [];

  for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
}
init();

/* ================== ANIMATION ================== */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* ---- STARS ---- */
  stars.forEach(star => {
    star.x += star.speedX;
    star.y += star.speedY;

    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  /* ---- COMETS ---- */
  comets.forEach((comet, i) => {
    comet.x += comet.vx;
    comet.y += comet.vy;
    comet.life++;

    ctx.strokeStyle = `rgba(255,255,255,${1 - comet.life / 60})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(comet.x, comet.y);
    ctx.lineTo(comet.x - comet.vx * 6, comet.y - comet.vy * 6);
    ctx.stroke();

    if (comet.life > 60) comets.splice(i, 1);
  });

  if (Math.random() < COMET_CHANCE) {
    comets.push(createComet());
  }

  requestAnimationFrame(animate);
}

animate();

/* ================== Scroll Reveal (Runs on every page) ================== */
(function setupReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach(el => observer.observe(el));
})();