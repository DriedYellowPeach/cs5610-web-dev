/**
 * Main JavaScript module for Neil's Homepage
 * Handles theme toggle, panels, and carousels
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
      const icon = button.querySelector(".theme-icon");
      if (icon) {
        // Sun for dark mode (click to go light), moon for light mode
        icon.textContent = theme === this.DARK ? "\u2600\uFE0F" : "\u{1F319}";
      }
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

// Panel management
const PanelManager = {
  init() {
    const panels = document.querySelectorAll(".panel");
    panels.forEach((panel) => {
      const header = panel.querySelector(".panel-header");
      if (header) {
        header.addEventListener("click", () => this.togglePanel(panel));
      }
    });
  },

  togglePanel(panel) {
    const isExpanded = panel.classList.contains("expanded");

    if (isExpanded) {
      panel.classList.remove("expanded");
    } else {
      panel.classList.add("expanded");
      // Initialize carousel if present and not already initialized
      const carousel = panel.querySelector("[data-carousel]");
      if (carousel && !carousel.dataset.initialized) {
        CarouselManager.initCarousel(carousel);
      }
    }
  },
};

// Carousel management
const CarouselManager = {
  init() {
    // Initialize carousels that are already visible (in expanded panels)
    document.querySelectorAll(".panel.expanded [data-carousel]").forEach((carousel) => {
      this.initCarousel(carousel);
    });
  },

  initCarousel(carousel) {
    if (carousel.dataset.initialized) return;

    const track = carousel.querySelector(".carousel-track");
    const items = carousel.querySelectorAll(".carousel-item");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    const prevBtn = carousel.querySelector(".carousel-nav.prev");
    const nextBtn = carousel.querySelector(".carousel-nav.next");

    if (!track || items.length === 0) return;

    let currentIndex = 0;

    // Create dots
    items.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = `carousel-dot${index === 0 ? " active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener("touchend", (e) => {
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

    carousel.dataset.initialized = "true";
  },
};

// Navigation active state
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
        (href === "index.html" && (currentPath.endsWith("/") || currentPath === ""));

      link.classList.toggle("active", isActive);
    });
  },
};

// Initialize all modules when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  PanelManager.init();
  CarouselManager.init();
  NavigationManager.init();
});

export { ThemeManager, PanelManager, CarouselManager, NavigationManager };
