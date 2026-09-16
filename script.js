// 1. Atmospheric Ambient Background Canvas
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    size: Math.random() * 1.5 + 0.5
  }));

  function drawBg() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(196, 255, 110, 0.12)';
    ctx.strokeStyle = 'rgba(196, 255, 110, 0.035)';

    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(drawBg);
  }
  drawBg();
}

// 2. Diagnostic Interactive Chips
const chips = document.querySelectorAll('.chips button');
const ansText = document.getElementById('ans-text');
const ansSub = document.getElementById('ans-sub');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    ansText.textContent = chip.dataset.answer;
    ansSub.textContent = chip.dataset.sub;
  });
});

// 3. Gibbon Media Tab Switcher (Terminal vs Video Preview)
const mTabs = document.querySelectorAll('.m-tab');
const mediaViews = document.querySelectorAll('.media-view');

mTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    mTabs.forEach(t => t.classList.remove('active'));
    mediaViews.forEach(v => v.classList.remove('active-view'));
    tab.classList.add('active');
    const targetView = document.getElementById(`${tab.dataset.view}-view`);
    if (targetView) targetView.classList.add('active-view');
  });
});

// 4. Life Audiology Mobile-Friendly Slideshow
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slide-btn.prev');
const nextBtn = document.querySelector('.slide-btn.next');
const indicator = document.querySelector('.slide-indicator');
let currentSlide = 0;

function updateSlide(index) {
  slides.forEach(s => s.classList.remove('active-slide'));
  slides[index].classList.add('active-slide');
  if (indicator) indicator.textContent = `${index + 1} / ${slides.length}`;
}

prevBtn?.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide(currentSlide);
});

nextBtn?.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
});

// 5. Cinematic About Book-Flip Transition
const bookContainer = document.getElementById('bookContainer');
const flipBtn = document.getElementById('flipBookBtn');
const unflipBookBtn = document.getElementById('unflipBookBtn');
const aboutNavLink = document.querySelector('a.about-trigger');

function toggleBookFlip(e) {
  if (e) e.preventDefault();
  bookContainer?.classList.toggle('flipped');
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
}

flipBtn?.addEventListener('click', () => toggleBookFlip());
unflipBookBtn?.addEventListener('click', () => toggleBookFlip());
aboutNavLink?.addEventListener('click', (e) => toggleBookFlip(e));

// 6. Scroll Reveal Observer for Sections
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 7. Mobile Navigation Toggle
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  if (window.innerWidth <= 800) {
    links.style.display = open ? '' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '76px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.padding = '20px';
    links.style.background = '#0b0f15';
    links.style.flexDirection = 'column';
    links.style.alignItems = 'stretch';
    links.style.borderBottom = '1px solid rgba(244,242,238,.1)';
  }
});

document.querySelectorAll('.links a').forEach(a => {
  if (!a.classList.contains('about-trigger')) {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 800) {
        links.style.display = '';
        menu.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
