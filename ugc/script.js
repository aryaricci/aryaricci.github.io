const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

if (header && toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// Fade sections in as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Custom cursor: disabled automatically on touch screens.
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let ringX = 0;
  let ringY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  };
  animateRing();

  document.querySelectorAll('a, button, .work-card').forEach((target) => {
    target.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
    target.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
  });
}


// A tiny cursor "squish" when clicking.
if (ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousedown', () => ring.classList.add('is-clicking'));
  window.addEventListener('mouseup', () => ring.classList.remove('is-clicking'));
  document.querySelectorAll('a, button, input, textarea, select, .collection-card, .video-tile, .journal-card').forEach((target) => {
    target.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
    target.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
  });
}
