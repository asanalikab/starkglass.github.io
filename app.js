document.addEventListener('DOMContentLoaded', () => {
  // Navigation Scroll Setup
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const btnBuy = document.querySelector('.btn-buy');

  const scrollToTarget = (id) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').replace('#', '');
      scrollToTarget(targetId);
    });
  });

  if (btnBuy) {
    btnBuy.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget('finance');
    });
  }

  // Apple-style Fade Up Animation using Intersection Observer
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve if you only want it to animate once
        // fadeObserver.unobserve(entry.target);
      } else {
        // Remove this else block if you want the animation to happen only once.
        // Keeping it makes elements fade out when scrolling past them and fade back in.
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });

  // Dark Nav adjustment based on section background
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('dark-section')) {
          nav.classList.add('dark-nav');
        } else {
          nav.classList.remove('dark-nav');
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});
