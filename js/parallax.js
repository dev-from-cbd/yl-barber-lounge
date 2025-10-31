// Parallax effect for hero slider and parallax sections
document.addEventListener('DOMContentLoaded', function () {
  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Disable on small screens to avoid performance issues
  const isMobile = window.innerWidth < 720;

  // Hero slider parallax
  const heroSlider = document.querySelector('.hero-slider.parallax');
  if (heroSlider && !isMobile) {
    const speed = 0.3;
    let ticking = false;
    const slides = heroSlider.querySelectorAll('.slide');

    function updateHero() {
      const rect = heroSlider.getBoundingClientRect();
      const offset = Math.round((rect.top) * speed);
      
      slides.forEach((slide) => {
        slide.style.backgroundPosition = `center ${offset}px`;
      });
      
      ticking = false;
    }

    function onScrollHero() {
      if (!ticking) {
        window.requestAnimationFrame(updateHero);
        ticking = true;
      }
    }

    updateHero();
    window.addEventListener('scroll', onScrollHero, { passive: true });
  }

  // Parallax sections effect
  const parallaxSections = document.querySelectorAll('.parallax-section');
  if (parallaxSections.length > 0 && !isMobile) {
    const speed = 0.5;
    let ticking = false;

    function updateParallax() {
      parallaxSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when section is in viewport
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const offset = Math.round((windowHeight - rect.top) * speed);
          section.style.backgroundPosition = `center ${offset}px`;
        }
      });
      
      ticking = false;
    }

    function onScrollParallax() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    updateParallax();
    window.addEventListener('scroll', onScrollParallax, { passive: true });
  }

  // Handle resize
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth < 720;
    
    if (newIsMobile) {
      // Disable parallax on small screens
      if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        slides.forEach((slide) => {
          slide.style.backgroundPosition = '';
        });
      }
      parallaxSections.forEach((section) => {
        section.style.backgroundPosition = '';
      });
    } else {
      // Re-enable on larger screens
      if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slide');
        updateHero();
        window.addEventListener('scroll', onScrollHero, { passive: true });
      }
      updateParallax();
      window.addEventListener('scroll', onScrollParallax, { passive: true });
    }
  });
});
