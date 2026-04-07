class App {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-links a[data-route]');
    this.ctaButtons = document.querySelectorAll('button[data-route]');
    this.sections = document.querySelectorAll('section');
    this.nav = document.querySelector('nav');
    
    this.init();
  }

  init() {
    // Smooth scrolling for nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.dataset.route;
        this.scrollToTarget(targetId);
      });
    });

    // Smooth scrolling for CTA buttons
    this.ctaButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.dataset.route; // Use currentTarget to avoid issues if clicking on an inner icon
        this.scrollToTarget(targetId);
      });
    });

    // Setup Intersection Observer for active link mapping
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.updateActiveLink(id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => {
      observer.observe(section);
    });
    
    // Header shadow on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    });
  }

  scrollToTarget(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for sticky header
        behavior: 'smooth'
      });
      // Optionally update URL hash
      history.pushState(null, null, `#${id}`);
      this.updateActiveLink(id);
    }
  }

  updateActiveLink(id) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.dataset.route === id) {
        link.classList.add('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
