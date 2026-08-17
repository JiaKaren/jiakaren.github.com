/**
 * Search Functionality using Fuse.js
 * Client-side search for all website content with multi-language support
 */

class SiteSearch {
    constructor() {
        this.pages = [];
        this.fuse = null;
        this.overlayElement = null;
        this.searchInput = null;
        this.resultsContainer = null;
        this.currentLanguage = 'en';
        this.init();
    }

    /**
     * Initialize search functionality
     */
    async init() {
        try {
            // Wait for Fuse.js to be loaded
            if (typeof Fuse === 'undefined') {
                console.error('Fuse.js is not loaded. Make sure to include it in your HTML.');
                return;
            }

            // Get DOM elements
            this.overlayElement = document.getElementById('search-overlay');
            this.searchInput = document.getElementById('search-input');
            this.resultsContainer = document.getElementById('search-results');

            if (!this.overlayElement || !this.searchInput || !this.resultsContainer) {
                console.error('Search DOM elements not found');
                return;
            }

            // Set initial language
            this.currentLanguage = window.currentLanguage || 'en';

            // Build search index
            await this.buildSearchIndex();

            // Setup event listeners
            this.setupEventListeners();

            // Listen for language changes
            this.setupLanguageChangeListener();
        } catch (error) {
            console.error('Search initialization failed:', error);
        }
    }

    /**
     * Setup listener for language changes
     */
    setupLanguageChangeListener() {
        // Watch for language select changes
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.currentLanguage = e.target.value;
                window.currentLanguage = e.target.value;
                this.updateSearchPlaceholder();
                this.rebuildSearchIndex();
            });
        }

        // Also listen for direct window.currentLanguage changes
        setInterval(() => {
            if (window.currentLanguage && window.currentLanguage !== this.currentLanguage) {
                this.currentLanguage = window.currentLanguage;
                this.updateSearchPlaceholder();
                this.rebuildSearchIndex();
            }
        }, 500);
    }

    /**
     * Update search input placeholder based on current language
     */
    updateSearchPlaceholder() {
        const placeholder = this.getTranslation('Search pages, essays, articles...');
        this.searchInput.placeholder = placeholder;
    }

    /**
     * Get translation for a key
     */
    getTranslation(text) {
        if (this.currentLanguage === 'en') return text;
        const translations = window.TRANSLATIONS || {};
        const langTranslations = translations[this.currentLanguage] || {};
        return langTranslations[text] || text;
    }

    /**
     * Rebuild search index when language changes
     */
    async rebuildSearchIndex() {
        try {
            this.pages = [];
            await this.buildSearchIndex();
            // Clear any previous search results
            this.resultsContainer.innerHTML = '';
        } catch (error) {
            console.error('Failed to rebuild search index:', error);
        }
    }

    /**
     * Build the searchable index from all pages
     */
    async buildSearchIndex() {
        try {
            const sections = [
                'home', 'about', 'accomplishments', 'classes',
                'videos', 'essays', 'articles', 'activities', 'resume',
                'photos', 'puzzles', 'library', 'contact'
            ];

            for (const section of sections) {
                try {
                    const response = await fetch(`${section}/${section}.html`);
                    if (response.ok) {
                        const html = await response.text();
                        let text = this.extractTextFromHTML(html);
                        
                        // Translate extracted text if not in English
                        if (this.currentLanguage !== 'en') {
                            text = this.translateText(text);
                        }
                        
                        this.pages.push({
                            title: this.getTranslatedTitle(section),
                            section: section,
                            content: text,
                            url: `#${section}`
                        });
                    }
                } catch (error) {
                    console.warn(`Could not load section: ${section}`);
                }
            }

            // Initialize Fuse.js with the pages
            this.fuse = new Fuse(this.pages, {
                keys: ['title', 'content'],
                threshold: 0.4,
                includeScore: true,
                minMatchCharLength: 2
            });
        } catch (error) {
            console.error('Failed to build search index:', error);
        }
    }

    /**
     * Translate extracted text using TRANSLATIONS
     */
    translateText(text) {
        // For simplicity, we'll return the original text
        // A full translation would require translating every phrase
        // For now, searching in English text works, but we return original for display
        return text;
    }

    /**
     * Extract text content from HTML
     */
    extractTextFromHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        
        // Remove script and style elements
        div.querySelectorAll('script, style').forEach(el => el.remove());
        
        // Get text content and clean it up
        const text = div.textContent || div.innerText;
        return text.replace(/\s+/g, ' ').trim();
    }

    /**
     * Get translated title for a section
     */
    getTranslatedTitle(section) {
        const titleMap = {
            'home': 'Home',
            'about': 'About',
            'accomplishments': 'Accomplishments',
            'classes': 'Academics',
            'videos': 'Videos',
            'essays': 'Essays',
            'articles': 'Articles',
            'activities': 'Activities',
            'resume': 'Resume',
            'photos': 'Photos',
            'puzzles': 'Puzzles',
            'library': 'Library',
            'contact': 'Contact'
        };
        const englishTitle = titleMap[section] || section.charAt(0).toUpperCase() + section.slice(1);
        return this.getTranslation(englishTitle);
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Open search overlay
        document.getElementById('search-icon-btn')?.addEventListener('click', () => {
            this.openSearch();
        });

        // Close search overlay
        document.getElementById('search-close-btn')?.addEventListener('click', () => {
            this.closeSearch();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlayElement.classList.contains('active')) {
                this.closeSearch();
            }
        });

        // Search on Enter key
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });

        // Clear results when input is cleared
        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.value === '') {
                this.resultsContainer.innerHTML = '';
            }
        });
    }

    /**
     * Open the search overlay
     */
    openSearch() {
        this.overlayElement.classList.add('active');
        this.searchInput.focus();
        this.updateSearchPlaceholder();
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    /**
     * Close the search overlay
     */
    closeSearch() {
        this.overlayElement.classList.remove('active');
        this.searchInput.value = '';
        this.resultsContainer.innerHTML = '';
        document.body.style.overflow = ''; // Restore scrolling
    }

    /**
     * Perform search and display results
     */
    performSearch() {
        const query = this.searchInput.value.trim();
        
        if (!query) {
            this.resultsContainer.innerHTML = `<div class="search-no-results">${this.getTranslation('Enter keywords to search...')}</div>`;
            return;
        }

        if (!this.fuse) {
            this.resultsContainer.innerHTML = `<div class="search-no-results">${this.getTranslation('Search index not ready. Please try again.')}</div>`;
            return;
        }

        const results = this.fuse.search(query).slice(0, 20); // Limit to 20 results

        if (results.length === 0) {
            this.resultsContainer.innerHTML = `<div class="search-no-results">${this.getTranslation('No results found for')} "<strong>${this.escapeHTML(query)}</strong>"</div>`;
            return;
        }

        // Render results
        this.resultsContainer.innerHTML = results.map(result => {
            const page = result.item;
            const preview = this.getContentPreview(page.content, query);
            
            return `
                <a href="${page.url}" class="search-result-item" onclick="siteSearch.closeSearch()">
                    <div class="search-result-title">${this.escapeHTML(page.title)}</div>
                    <div class="search-result-description">${preview}</div>
                </a>
            `;
        }).join('');
    }

    /**
     * Get a preview of the content around the search term
     */
    getContentPreview(content, query, previewLength = 120) {
        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const index = lowerContent.indexOf(lowerQuery);

        let preview;
        if (index > -1) {
            const start = Math.max(0, index - 30);
            const end = Math.min(content.length, start + previewLength);
            preview = content.substring(start, end).trim();
            if (start > 0) preview = '...' + preview;
            if (end < content.length) preview = preview + '...';
        } else {
            preview = content.substring(0, previewLength).trim() + '...';
        }

        return this.escapeHTML(preview);
    }

    /**
     * Escape HTML special characters
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.siteSearch = new SiteSearch();
    });
} else {
    window.siteSearch = new SiteSearch();
}
