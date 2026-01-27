/**
 * Main JavaScript module for Neil's Homepage
 * Handles navigation, theme toggle, and typing effect
 */

// Theme management
const ThemeManager = {
  STORAGE_KEY: "theme",
  DARK: "dark",
  LIGHT: "light",

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) || this.DARK;
    this.setTheme(savedTheme);
    this.bindToggleButton();
  },

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.updateToggleButton(theme);
  },

  toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || this.DARK;
    const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;
    this.setTheme(newTheme);
  },

  updateToggleButton(theme) {
    const button = document.getElementById("theme-toggle-btn");
    if (button) {
      // Moon for dark mode, sun for light mode
      button.textContent =
        theme === this.DARK ? "\u{1F319}" : "\u{2600}\u{FE0F}";
      button.setAttribute(
        "aria-label",
        `Switch to ${theme === this.DARK ? "light" : "dark"} mode`
      );
    }
  },

  bindToggleButton() {
    const button = document.getElementById("theme-toggle-btn");
    if (button) {
      button.addEventListener("click", () => this.toggleTheme());
    }
  },
};

// Typing effect for terminal section
const TypingEffect = {
  phrases: [
    "echo 'Hello, World!'",
    "npm run dev",
    "git commit -m 'Initial commit'",
    "cargo build --release",
    "docker-compose up -d",
    "kubectl get pods",
    "nvim config.lua",
    "rustc --version",
  ],
  typingSpeed: 80,
  deletingSpeed: 40,
  pauseDuration: 2000,
  currentPhraseIndex: 0,
  currentCharIndex: 0,
  isDeleting: false,
  element: null,

  init() {
    this.element = document.getElementById("typing-text");
    if (this.element) {
      this.type();
    }
  },

  type() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];

    if (this.isDeleting) {
      // Remove characters
      this.element.textContent = currentPhrase.substring(
        0,
        this.currentCharIndex - 1
      );
      this.currentCharIndex--;
    } else {
      // Add characters
      this.element.textContent = currentPhrase.substring(
        0,
        this.currentCharIndex + 1
      );
      this.currentCharIndex++;
    }

    // Calculate next action timing
    let timeout = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    // Check if phrase is complete
    if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
      // Pause at end of phrase
      timeout = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      // Move to next phrase
      this.isDeleting = false;
      this.currentPhraseIndex =
        (this.currentPhraseIndex + 1) % this.phrases.length;
    }

    setTimeout(() => this.type(), timeout);
  },
};

// Navigation active state management
const NavigationManager = {
  init() {
    this.highlightCurrentPage();
  },

  highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive =
        currentPath.endsWith(href) ||
        (href === "index.html" && currentPath.endsWith("/"));

      link.classList.toggle("active", isActive);
    });
  },
};

// Scroll animations using Intersection Observer
const ScrollAnimations = {
  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });
  },
};

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  TypingEffect.init();
  NavigationManager.init();
  ScrollAnimations.init();
});

// Export for potential use in other modules
export { ThemeManager, TypingEffect, NavigationManager, ScrollAnimations };
