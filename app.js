class App {
  constructor() {
    this.routes = {
      'home': document.getElementById('home'),
      'product': document.getElementById('product'),
      'b2b': document.getElementById('b2b'),
      'about': document.getElementById('about'),
      'investors': document.getElementById('investors')
    };
    
    this.navLinks = document.querySelectorAll('.nav-links a[data-route]');
    this.ctaButtons = document.querySelectorAll('button[data-route]');
    
    this.init();
  }

  init() {
    // Event listeners
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(e.target.dataset.route);
      });
    });

    this.ctaButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.navigate(e.target.dataset.route);
      });
    });

    // Handle initial route
    const hash = window.location.hash.replace('#', '') || 'home';
    this.navigate(hash);
  }

  navigate(routeId) {
    if(!this.routes[routeId]) return;

    // Update URL hash without jumping
    history.pushState(null, null, `#${routeId}`);

    // Hide all sections
    Object.values(this.routes).forEach(section => {
      if(section) section.classList.remove('active');
    });

    // Show target section
    this.routes[routeId].classList.add('active');

    // Update Active Nav Link
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.dataset.route === routeId) {
        link.classList.add('active');
      }
    });

    window.scrollTo(0, 0);
  }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
