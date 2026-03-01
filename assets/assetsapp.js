(function () {
  const header = document.getElementById("siteHeader");
  const hamburger = document.getElementById("hamburger");
  const mobilePanel = document.getElementById("mobilePanel");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Sync header height for main padding (prevents overlap)
  function syncHeaderHeight() {
    if (!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--header-h", `${Math.ceil(h)}px`);
  }
  window.addEventListener("resize", syncHeaderHeight);
  window.addEventListener("load", syncHeaderHeight);
  syncHeaderHeight();

  // Mobile menu
  function setMobileOpen(open) {
    if (!hamburger || !mobilePanel) return;
    hamburger.setAttribute("aria-expanded", String(open));
    mobilePanel.hidden = !open;
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const open = hamburger.getAttribute("aria-expanded") === "true";
      setMobileOpen(!open);
    });
  }

  // Active nav state: read from <body data-page="home|about|services|process|contact">
  const page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll(`[data-active]`).forEach((el) => {
      if (el.getAttribute("data-active") === page) el.classList.add("active");
    });
  }

  // Close mobile menu on link click
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (a.classList.contains("navlink") || a.closest(".mobile-links")) setMobileOpen(false);
  });

  // ESC closes mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMobileOpen(false);
  });
})();
