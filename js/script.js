// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Animasi fade-in untuk elemen saat di-scroll
function fadeInOnScroll() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("visible");
    }
  });
}

// Menggunakan requestAnimationFrame untuk performa yang lebih baik
let fadeInTimeout;
window.addEventListener("scroll", () => {
  if (fadeInTimeout) cancelAnimationFrame(fadeInTimeout);
  fadeInTimeout = requestAnimationFrame(fadeInOnScroll);

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});
window.addEventListener("load", fadeInOnScroll);

// Filter gallery items
document.querySelectorAll("button[data-filter]").forEach((button) => {
  button.addEventListener("click", function () {
    // Remove the active class from all buttons
    document.querySelectorAll("button[data-filter]").forEach((btn) => {
      btn.classList.remove("bg-teal-700", "text-white");
      btn.classList.add("text-teal-700", "bg-white");
    });

    // Add the active class to the clicked button
    this.classList.remove("text-teal-700", "bg-white");
    this.classList.add("bg-teal-700", "text-white");

    const filter = this.getAttribute("data-filter");
    document.querySelectorAll(".gallery-item").forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

// JavaScript to handle "See All" button
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const seeAllButton = document.getElementById("seeAll");
  const galleryItems = Array.from(gallery.querySelectorAll(".gallery-item"));
  const filterButtons = document.querySelectorAll(".filter-button");

  // Initially show only the first 6 items
  function showInitialItems() {
    galleryItems.forEach((item, index) => {
      if (index < 6) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }

  showInitialItems();

  // Toggle all items
  seeAllButton.addEventListener("click", () => {
    const hiddenItems = gallery.querySelectorAll(".gallery-item.hidden");
    const activeFilter = document.querySelector(".filter-button.text-white");

    if (activeFilter && activeFilter.dataset.filter === "all") {
      if (hiddenItems.length > 0) {
        galleryItems.forEach((item) => item.classList.remove("hidden"));
        seeAllButton.textContent = "Tampilkan Lebih Sedikit";
      } else {
        showInitialItems();
        seeAllButton.textContent = "See All";
      }
    }
  });

  // Filter items
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("text-white", "bg-teal-700");
        btn.classList.add("text-teal-700", "bg-white");
      });

      button.classList.add("text-white", "bg-teal-700");
      button.classList.remove("text-teal-700", "bg-white");

      galleryItems.forEach((item) => {
        if (item.classList.contains(filter) || filter === "all") {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });

      if (filter === "all") {
        showInitialItems();
        seeAllButton.classList.remove("hidden");
      } else {
        seeAllButton.classList.add("hidden");
      }
    });
  });
});

// Scroll to top on page load
window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});
