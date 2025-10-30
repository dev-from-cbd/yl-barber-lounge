// Lightweight parallax for .hero background
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero.parallax');
  if (!hero) return;

  // respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // disable on small screens to avoid jank
  if (window.innerWidth < 720) return;

  const speed = 0.35; // 0 = no movement, 1 = same speed as scroll
  let ticking = false;

  function update() {
    const rect = hero.getBoundingClientRect();
    // compute offset relative to viewport top; positive when hero moves up
    const offset = Math.round((rect.top) * speed);
    // place background center with offset (px)
    hero.style.backgroundPosition = `center ${offset}px`;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  // initial update and listeners
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    // disable if resized to small screens
    if (window.innerWidth < 720) {
      hero.style.backgroundPosition = ''; // restore
      window.removeEventListener('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    }
  });
});