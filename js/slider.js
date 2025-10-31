// Slider functionality for hero section
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.hero-slider');
  const slides = document.querySelector('.slides');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!slider || !slides) return;
  
  const slideCount = slides.children.length;
  let currentSlide = 0;
  let autoplayInterval;
  
  // Create dots
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  
  function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoplay();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  // Start autoplay
  resetAutoplay();
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    resetAutoplay();
  });
  
  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
      }
      resetAutoplay();
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlider();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
});
