// ============================================
// Personal Website - Enhanced Main JavaScript
// Features: Theme Switching, Video Auto-pause, Dynamic Backgrounds
// Works with Router for SPA navigation
// ============================================

// ============================================
// Theme Management System
// ============================================

class ThemeManager {
  constructor() {
    this.currentTheme = CONFIG.getTheme();
    this.init();
  }

  init() {
    // Apply current theme
    this.applyTheme(this.currentTheme);
    
    // Listen for theme changes
    window.addEventListener('themeChange', (e) => {
      this.currentTheme = CONFIG.getTheme();
      this.applyTheme(CONFIG.getTheme());
    });
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--accent-color', theme.colors.accent);
    root.style.setProperty('--tertiary-color', theme.colors.tertiary);
    root.style.setProperty('--pale-accent', theme.colors.paleAccent);
    root.style.setProperty('--text-dark', theme.colors.textDark);
    root.style.setProperty('--text-light', theme.colors.textLight);
    root.style.setProperty('--bg-light', theme.colors.bgLight);
    root.style.setProperty('--bg-white', theme.colors.bgWhite);
    root.style.setProperty('--border-color', theme.colors.borderColor);
    root.style.setProperty('--success-color', theme.colors.successColor);
    root.style.setProperty('--warning-color', theme.colors.warningColor);
    
    // Apply fonts
    root.style.setProperty('--font-serif-title', theme.fonts.serif);
    root.style.setProperty('--font-serif-body', theme.fonts.body);
    
    // Apply background images for nav, footer, and body
    root.style.setProperty('--navbar-bg', theme.navbar);
    root.style.setProperty('--footer-bg', theme.footer);
    root.style.setProperty('--body-bg', theme.body);
    
    // Trigger re-render
    document.body.style.transition = `background-color ${CONFIG.settings.animationDuration}ms ease`;
    document.body.style.color = theme.colors.textDark;
    document.body.style.backgroundColor = theme.body;
  }

  switchTheme(themeName) {
    CONFIG.switchTheme(themeName);
  }

  getAvailableThemes() {
    return Object.keys(CONFIG.themes);
  }
}

// ============================================
// Dynamic Background Switcher
// ============================================

class BackgroundSwitcher {
  constructor() {
    this.currentSection = null;
    this.mainElement = document.querySelector('main');
    
    if (!this.mainElement) return;
    
    this.init();
  }

  init() {
    if (CONFIG.settings.enableDynamicBackground) {
      window.addEventListener('scroll', () => this.updateBackground());
      window.addEventListener('themeChange', () => {
        // Reset current section so background gets reapplied
        this.currentSection = null;
        this.updateBackground();
      });
      
      // Initial background
      this.updateBackground();
    }
  }

  updateBackground() {
    const sections = document.querySelectorAll('section');
    let currentSection = null;
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        currentSection = section;
      }
    });
    
    if (currentSection && this.currentSection !== currentSection.id) {
      this.currentSection = currentSection.id;
      this.applyBackground(currentSection.id);
    }
  }

  applyBackground(sectionId) {
    const theme = CONFIG.getTheme();
    const background = theme.backgroundImages[sectionId] || theme.backgroundImages.home;
    
    if (this.mainElement) {
      this.mainElement.style.transition = `background ${CONFIG.settings.animationDuration}ms ease`;
      this.mainElement.style.background = background;
    }
  }
}

// ============================================
// Slideshow Component
// ============================================

class Slideshow {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slide');
    this.dots = this.container.querySelectorAll('.slide-dot');
    this.currentSlide = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Show first slide
    this.showSlide(0);

    // Add event listeners to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Add event listeners to arrow buttons
    const prevBtn = this.container.querySelector('.slide-arrow.prev');
    const nextBtn = this.container.querySelector('.slide-arrow.next');

    if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

    // Start auto play
    this.autoPlay();

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.autoPlay());
  }

  showSlide(n) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    this.slides[n].classList.add('active');
    this.dots[n].classList.add('active');
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.currentSlide);
  }

  goToSlide(n) {
    this.currentSlide = n;
    this.showSlide(this.currentSlide);
  }

  autoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// ============================================
// Video Auto-pause on Slideshow Scroll
// ============================================

class SlideShowVideoManager {
  constructor() {
    this.slideshow = document.getElementById('slideshow');
    this.videos = [];
    this.init();
  }

  init() {
    if (!this.slideshow) return;
    
    // Collect videos
    this.collectVideos();
    
    // Monitor slideshow visibility
    if ('IntersectionObserver' in window) {
      this.observeSlideshow();
    } else {
      window.addEventListener('scroll', () => this.checkVisibility());
    }
  }

  collectVideos() {
    const allIframes = document.querySelectorAll('iframe[src*="youtube"]');
    this.videos = Array.from(allIframes);
  }

  observeSlideshow() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.resumeVideos();
        } else {
          this.pauseVideos();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.slideshow);
  }

  checkVisibility() {
    const rect = this.slideshow.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      this.resumeVideos();
    } else {
      this.pauseVideos();
    }
  }

  pauseVideos() {
    this.videos.forEach((video) => {
      video.contentWindow.postMessage(
        { event: 'command', func: 'pauseVideo' },
        '*'
      );
    });
  }

  resumeVideos() {
    // Note: Auto-play may be restricted by browser
  }
}

// ============================================
// Initialize on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme Manager
  window.themeManager = new ThemeManager();
  
  // Initialize Background Switcher
  window.bgSwitcher = new BackgroundSwitcher();
  
  // Initialize Slideshow
  new Slideshow('slideshow');
  
  // Setup navigation mobile toggle
  setupMobileNavigation();
  
  // Setup contact form if it exists
  initContactForm();
  
  // Initialize video manager for slideshow
  setTimeout(() => {
    new SlideShowVideoManager();
  }, 100);
});

// ============================================
// Theme Toggle Button Setup
// ============================================

function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  
  // Remove any existing click handlers by cloning the element
  const newBtn = toggleBtn.cloneNode(true);
  toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);
  
  // Attach new click handler to the new element
  newBtn.addEventListener('click', () => {
    if (window.themeManager) {
      // Switch between lightDefault and darkDefault
      const currentTheme = CONFIG.activeTheme;
      const nextTheme = currentTheme === 'lightDefault' ? 'darkDefault' : 'lightDefault';
      window.themeManager.switchTheme(nextTheme);
    }
  });
}

// Make setupThemeToggle globally accessible
window.setupThemeToggle = setupThemeToggle;

// ============================================
// Mobile Navigation Toggle
// ============================================

function setupMobileNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) {
    console.warn('Navigation elements not found');
    return;
  }

  // Remove existing listeners first (in case this is called multiple times)
  const newToggle = navToggle.cloneNode(true);
  navToggle.parentNode.replaceChild(newToggle, navToggle);

  const newToggleBtn = document.querySelector('.nav-toggle');
  newToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only close if it's a data-section link (SPA navigation)
      if (link.getAttribute('data-section')) {
        navLinks.classList.remove('active');
      }
    });
  });
}

// Make setupMobileNavigation globally accessible
window.setupMobileNavigation = setupMobileNavigation;

// ============================================
// Contact Form Handler
// ============================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    // Check if success parameter is in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      // Show success message
      alert('Message sent successfully! I\'ll get back to you soon.');
      // Clear the form
      form.reset();
      // Remove success parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  });

  // Check for success on page load
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    alert('Message sent successfully! I\'ll get back to you soon.');
    form.reset();
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}


// ============================================
// Lightbox for Gallery
// ============================================

class Lightbox {
  constructor() {
    this.observeGallery();
  }

  observeGallery() {
    // Watch for gallery items being added to DOM
    const observer = new MutationObserver(() => {
      const galleryItems = document.querySelectorAll('.gallery-image');
      if (galleryItems.length > 0) {
        this.init();
        observer.disconnect();
      }
    });

    observer.observe(document.getElementById('content-viewport') || document.body, {
      childList: true,
      subtree: true
    });
  }

  init() {
    const galleryItems = document.querySelectorAll('.photo-item');
    if (galleryItems.length === 0) return;

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => this.openLightbox(e));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeLightbox();
    });
  }

  openLightbox(e) {
    const item = e.currentTarget;
    const img = item.querySelector('img');

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="${img.src}" alt="${img.alt}">
      </div>
    `;

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.remove();
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.remove();
    });

    document.body.appendChild(lightbox);
  }

  closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) lightbox.remove();
  }
}

// Initialize lightbox
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Lightbox());
} else {
  new Lightbox();
}
