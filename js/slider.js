document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return; // no slider present

  const slidesEl = slider.querySelector('.slides');
  const slides = slidesEl ? Array.from(slidesEl.children) : [];
  const dotsContainer = slider.querySelector('.slider-dots');
  if (!slidesEl || slides.length === 0) return;

  let current = 0;
  const total = slides.length;
  const interval = 4000;
  let timer = null;

  // build dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    btn.dataset.index = i;
    btn.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsContainer.appendChild(btn);
  }

  function updateDots() {
    Array.from(dotsContainer.children).forEach((b, i) => b.classList.toggle('active', i === current));
  }

  function goTo(index) {
    current = (index + total) % total;
    slidesEl.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    stopTimer();
    timer = setInterval(next, interval);
  }
  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function resetTimer() { stopTimer(); startTimer(); }

  // pause on hover/focus
  slider.addEventListener('mouseenter', stopTimer);
  slider.addEventListener('mouseleave', startTimer);
  slider.addEventListener('focusin', stopTimer);
  slider.addEventListener('focusout', startTimer);

  // keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(current - 1); resetTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
  });

  // init
  goTo(0);
  startTimer();

  // ensure layout recalculation on resize
  window.addEventListener('resize', () => { goTo(current); });
});