/* ========================================================
   script.js – Samarth Dhamija Portfolio
   ======================================================== */

/* ─── CUSTOM CURSOR ────────────────────────────────────── */
const cursor        = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ─── NAVBAR SCROLL ────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  highlightNav();
});

/* ─── HAMBURGER ────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ─── ACTIVE NAV HIGHLIGHT ─────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

/* ─── TYPEWRITER ───────────────────────────────────────── */
const roles = [
  'IT Student 🎓',
  'Web Developer 💻',
  'Python Coder 🐍',
  'Problem Solver 🧠',
  'Java Programmer ☕',
];
const typeEl = document.getElementById('typewriter');
let rIdx = 0, cIdx = 0, deleting = false;

function type() {
  const role = roles[rIdx];
  if (!deleting) {
    typeEl.textContent = role.slice(0, ++cIdx);
    if (cIdx === role.length) {
      setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
  } else {
    typeEl.textContent = role.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

/* ─── SCROLL REVEAL ────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);
revealEls.forEach(el => observer.observe(el));

/* ─── SKILL BARS ───────────────────────────────────────── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

/* ─── PARTICLE CANVAS ──────────────────────────────────── */
const canvas  = document.getElementById('particles');
const ctx     = canvas.getContext('2d');
let W, H, particles;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => { resize(); initParticles(); });
resize();

function initParticles() {
  const count = Math.floor((W * H) / 18000);
  particles = Array.from({ length: count }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    r:  Math.random() * 1.5 + 0.4,
    dx: (Math.random() - .5) * 0.4,
    dy: (Math.random() - .5) * 0.4,
    alpha: Math.random() * 0.5 + 0.15,
  }));
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124,58,237,${p.alpha})`;
    ctx.fill();

    p.x += p.dx; p.y += p.dy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
  });

  /* connect nearby particles */
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist/140)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ─── CONTACT FORM ─────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending…';
  btn.disabled    = true;
  setTimeout(() => {
    btn.textContent = 'Send Message 🚀';
    btn.disabled    = false;
    success.style.display = 'block';
    document.getElementById('contactForm').reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1200);
}

/* ─── SMOOTH HOVER GLOW CARDS ──────────────────────────── */
document.querySelectorAll('.glass').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
    const y = ((e.clientY - rect.top ) / rect.height - 0.5) * 20;
    card.style.transform = `perspective(600px) rotateY(${x * 0.4}deg) rotateX(${-y * 0.4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
