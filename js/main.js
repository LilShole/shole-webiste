/* =========================
   PARTICLES BACKGROUND
========================= */
const canvas = document.getElementById("bg");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const DOTS = 120;
  let dots = Array.from({ length: DOTS }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.8,
    s: Math.random() * 0.5 + 0.15
  }));

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(180,200,255,.4)";
      ctx.fill();

      d.y -= d.s;
      if (d.y < 0) {
        d.y = canvas.height;
        d.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(animate);
  })();
}

/* =========================
   NAV TEXT ROTATION
========================= */
const navText = document.getElementById("navText");

if (navText) {
  const words = ["SHOLE", "LIMITLESS", "WEB PAGES", "GAMES", "STORES", "PRODUCTS", "ENJOY"];
  let index = 0;

  setInterval(() => {
    navText.style.opacity = 0;
    navText.style.transform = "translateY(20px)";

    setTimeout(() => {
      index = (index + 1) % words.length;
      navText.textContent = words[index];
      navText.style.transform = "translateY(-20px)";

      setTimeout(() => {
        navText.style.opacity = 1;
        navText.style.transform = "translateY(0)";
      }, 120);
    }, 350);
  }, 2600);
}

/* =========================
   HAMBURGER MENU + AUTO CLOSE
========================= */
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

let menuCloseTimeout;

if (hamburger && menu) {

  hamburger.addEventListener("click", () => {
    const isOpen = menu.classList.contains("active");
    isOpen ? closeMenu() : openMenu();
  });

  // ESC close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Mouse leave (delayed)
  menu.addEventListener("mouseleave", () => {
    menuCloseTimeout = setTimeout(closeMenu, 250);
  });

  // Cancel close if mouse returns
  menu.addEventListener("mouseenter", () => {
    clearTimeout(menuCloseTimeout);
  });

  // Close on menu link click
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

function openMenu() {
  menu.classList.add("active");
  hamburger.classList.add("active");
}

function closeMenu() {
  menu.classList.remove("active");
  hamburger.classList.remove("active");
}

/* =========================
   PAGE LOADER
========================= */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 600);
  }
});

/* =========================
   SMOOTH PAGE TRANSITION
========================= */
document.querySelectorAll("a[href]").forEach(link => {
  const url = link.getAttribute("href");

  if (
    url &&
    !url.startsWith("#") &&
    !url.startsWith("http") &&
    !url.startsWith("mailto")
  ) {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location.href = url;
      }, 500);
    });
  }
});

/* =========================
   REUSABLE SUBPAGE HEADER
========================= */
document.querySelectorAll(".sub-header").forEach(header => {
  const title = header.dataset.title;
  const subtitle = header.dataset.subtitle;

  if (title) {
    const h1 = document.createElement("h1");
    h1.textContent = title;
    header.appendChild(h1);
  }

  if (subtitle) {
    const p = document.createElement("p");
    p.textContent = subtitle;
    header.appendChild(p);
  }
});
