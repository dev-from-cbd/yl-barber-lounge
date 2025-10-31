document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return; // no slider present

  const slidesEl = slider.querySelector('.slides'); // find the slides container element
  const slides = slidesEl ? Array.from(slidesEl.children) : []; // array of slide elements (or empty)
  const dotsContainer = slider.querySelector('.slider-dots'); // container for pagination dots
  if (!slidesEl || slides.length === 0) return; // stop if no slides found

  let current = 0; // index of the current slide
  const total = slides.length; // total number of slides
  const interval = 4000; // autoplay delay in milliseconds
  let timer = null; // reference to autoplay timer (will store ID)

  // build dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button'); // create a dot button
    btn.type = 'button'; // make it a non-submit button
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1)); // accessible label with slide number
    btn.dataset.index = i; // store slide index for reference
    btn.addEventListener('click', () => { goTo(i); resetTimer(); }); // go to slide and restart autoplay on click
    dotsContainer.appendChild(btn); // append the dot to the dots container
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