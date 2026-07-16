// Config file for color schemes and theming
// Change the active theme here or programmatically via JavaScript

const CONFIG = {
  // Active theme - change this to switch schemes
  activeTheme: 'lightDefault', // options: 'lightDefault', 'darkDefault'

  // Theme definitions
  themes: {
    lightDefault: {
      name: 'Light Warm',
      description: 'Warm sepia, brown, and pink palette with light background',
      colors: {
        primary: '#a0714f',
        secondary: '#8b5a3c',
        accent: '#d9a5a0',
        tertiary: '#cf9caa',
        paleAccent: '#f7ffe0',
        textDark: '#3e3a38',
        textLight: '#8b8b8b',
        bgLight: '#fef5f1',
        bgWhite: '#ffffff',
        borderColor: '#e8d5cc',
        successColor: '#b8956a',
        warningColor: '#c9977a',
      },
      fonts: {
        serif: "'Garamond', 'Georgia', serif",
        body: "'Lora', 'Georgia', serif",
      },
      backgroundImages: {
        home: '#fef5f1',
        about: '#fef5f1',
        accomplishments: '#fef5f1',
        classes: '#fef5f1',
        videos: '#fef5f1',
        essays: '#fef5f1',
        activities: '#fef5f1',
        resume: '#fef5f1',
        photos: '#fef5f1',
        puzzles: '#fef5f1',
        contact: '#fef5f1',
      },
      navbar: 'linear-gradient(90deg, rgba(160, 113, 79, 0.08) 0%, rgba(217, 165, 160, 0.08) 100%), #ffffff',
      footer: '#3e3a38',
      body: '#fef5f1'
    },

    darkDefault: {
      name: 'Dark Warm',
      description: 'Warm sepia, brown, and pink palette with dark background',
      colors: {
        primary: '#d9a5a0',
        secondary: '#c9977a',
        accent: '#e8c4b8',
        tertiary: '#cf9caa',
        paleAccent: '#f7ffe0',
        textDark: '#f5ede6',
        textLight: '#c9a08f',
        bgLight: '#3a3530',
        bgWhite: '#4a4239',
        borderColor: '#6b5b51',
        successColor: '#c9977a',
        warningColor: '#e8b4a0',
      },
      fonts: {
        serif: "'Garamond', 'Georgia', serif",
        body: "'Lora', 'Georgia', serif",
      },
      backgroundImages: {
        home: '#2d2725',
        about: '#2d2725',
        accomplishments: '#2d2725',
        classes: '#2d2725',
        videos: '#2d2725',
        essays: '#2d2725',
        activities: '#2d2725',
        resume: '#2d2725',
        photos: '#2d2725',
        puzzles: '#2d2725',
        contact: '#2d2725',
      },
      navbar: 'linear-gradient(90deg, rgba(217, 165, 160, 0.15) 0%, rgba(201, 151, 122, 0.15) 100%), #2d2725',
      footer: '#3e3a38',
      body: '#2d2725'
    },
  },

  // Settings for dynamic behavior
  settings: {
    autoPlaySlideshow: true,
    autoPlayInterval: 5000, // milliseconds
    enableDynamicBackground: true,
    enableVideoAutoPause: true,
    animationDuration: 300, // milliseconds
  },

  // Navigation structure
  sections: [
    { id: 'home', title: 'Home', path: '/', icon: '🏠' },
    { id: 'about', title: 'About', path: '/about/', icon: '👤' },
    { id: 'accomplishments', title: 'Accomplishments', path: '/accomplishments/', icon: '🏆' },
    { id: 'classes', title: 'Classes', path: '/classes/', icon: '📚' },
    { id: 'videos', title: 'Videos', path: '/videos/', icon: '▶️' },
    { id: 'essays', title: 'Essays', path: '/essays/', icon: '📝' },
    { id: 'articles', title: 'Articles', path: '/articles/', icon: '📰' },
  ],

  // Get current theme
  getTheme() {
    return this.themes[this.activeTheme] || this.themes.default;
  },

  // Switch theme
  switchTheme(themeName) {
    if (this.themes[themeName]) {
      this.activeTheme = themeName;
      // Store in localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('selectedTheme', themeName);
      }
      // Trigger theme change event
      window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: themeName } }));
      return true;
    }
    return false;
  },

  // Load saved theme from localStorage
  loadSavedTheme() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('selectedTheme');
      if (saved && this.themes[saved]) {
        this.activeTheme = saved;
      }
    }
  },
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CONFIG.loadSavedTheme());
} else {
  CONFIG.loadSavedTheme();
}
