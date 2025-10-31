// Reviews slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.reviews-slider');
  const track = document.querySelector('.reviews-track');
  const cards = track.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots-reviews');
  
  if (!slider || !track || cards.length === 0) return;
  
  let currentIndex = 0;
  let autoplayInterval;
  let isTransitioning = false;
  
  // Calculate how many cards to show based on screen size
  function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }
  
  let cardsPerView = getCardsPerView();
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  
  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to review page ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  
  function updateSlider() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    cardsPerView = getCardsPerView();
    const cardWidth = track.offsetWidth / cardsPerView;
    const offset = -currentIndex * (cardWidth + 24); // 24px is gap
    
    track.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('button');
    const activeDotIndex = Math.floor(currentIndex / cardsPerView);
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeDotIndex);
    });
    
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }
  
  function goToSlide(index) {
    if (isTransitioning) return;
    currentIndex = index * cardsPerView;
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }
    updateSlider();
    resetAutoplay();
  }
  
  function nextSlide() {
    if (isTransitioning) return;
    cardsPerView = getCardsPerView();
    currentIndex += cardsPerView;
    
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    }
    updateSlider();
    resetAutoplay();
  }
  
  function prevSlide() {
    if (isTransitioning) return;
    cardsPerView = getCardsPerView();
    currentIndex -= cardsPerView;
    
    if (currentIndex < 0) {
      currentIndex = Math.floor((cards.length - 1) / cardsPerView) * cardsPerView;
    }
    updateSlider();
    resetAutoplay();
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  // Button event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
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
  }, { passive: true });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
  
  // Handle resize
  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    currentIndex = 0;
    updateSlider();
    resetAutoplay();
  });
  
  // Initial setup
  updateSlider();
});

