/* ── CUSTOM CURSOR ─────────────────────────────────────── */
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let mx = -100,
  my = -100;
let rx = -100,
  ry = -100;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll(
    "a, button, .proj-card, .exp-card, .skill-category, .tl-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });

/* ── HEADER SCROLL ─────────────────────────────────────── */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  updateActiveNav();
});

/* ── MOBILE MENU ───────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  const open = hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

/* ── ACTIVE NAV ────────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
function updateActiveNav() {
  const y = window.scrollY + 120;
  sections.forEach((sec) => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}

/* ── REVEAL ON SCROLL ──────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ── SKILL BAR ANIMATION ───────────────────────────────── */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-bar-fill").forEach((bar, i) => {
          setTimeout(() => bar.classList.add("animated"), i * 150);
        });
        barObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 },
);

document
  .querySelectorAll(".skill-category")
  .forEach((el) => barObserver.observe(el));

/* ── STAT COUNTER ANIMATION ────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const dur = 1600;
  const start = performance.now();
  const step = (ts) => {
    const progress = Math.min((ts - start) / dur, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        document
          .querySelectorAll(".stat-num[data-target]")
          .forEach(animateCounter);
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 },
);

const statsEl = document.querySelector(".hero-stats");
if (statsEl) counterObserver.observe(statsEl);

/* ── TICKER ────────────────────────────────────────────── */
const tickerItems = [
  "☕ Java",
  "🐍 Python",
  "🚀 FastAPI",
  "🟢 Node.js",
  "🤖 AI Agents",
  "🦙 Ollama",
  "🗄️ MySQL",
  "🌿 Git",
  "🐙 GitHub",
  "🔌 Arduino",
  "📡 IoT Systems",
  "🔗 REST APIs",
  "🧩 DSA",
  "💡 Open Source",
];
const ticker = document.getElementById("ticker");
const doubled = [...tickerItems, ...tickerItems];
ticker.innerHTML = doubled
  .map(
    (item) =>
      `<span class="ticker-item"><span class="ticker-dot"></span>${item}</span>`,
  )
  .join("");

/* ── PROJECT CARD GLOW (mouse tracking) ────────────────── */
document.querySelectorAll(".proj-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", x + "%");
    card.style.setProperty("--my", y + "%");
  });
});

/* ── PARALLAX ON HERO ──────────────────────────────────── */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const hero = document.getElementById("hero");
  if (!hero) return;
  const orbs = hero.querySelectorAll(".orb");
  orbs.forEach((orb, i) => {
    const speed = 0.1 + i * 0.05;
    orb.style.transform = `translateY(${scrollY * speed}px) scale(1)`;
  });
  // Parallax floating badges
  const badges = document.querySelector(".float-badges");
  if (badges)
    badges.style.transform = `translateY(calc(-50% + ${scrollY * 0.15}px))`;
});

/* ── SMOOTH APPEAR for cards with stagger ──────────────── */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const cards = e.target.querySelectorAll(".proj-card, .exp-card");
        cards.forEach((c, i) => {
          setTimeout(() => {
            c.style.opacity = "1";
            c.style.transform = "translateY(0)";
          }, i * 80);
        });
      }
    });
  },
  { threshold: 0.05 },
);

document
  .querySelectorAll("#projects, #experience")
  .forEach((s) => cardObserver.observe(s));

/* ── TYPING EFFECT for hero sub ───────────────────────── */
const roles = [
  "Java Developer — Building Robust Applications.",
  "Python Wizard — Automating the Impossible.",
  "AI Enthusiast — Teaching Machines to Think.",
  "Full Stack Builder — From Backend to Frontend.",
  "Problem Solver — One Bug at a Time.",
];
const eyebrowText = document.querySelector(".hero-eyebrow span");
if (eyebrowText) {
  let ri = 0,
    ci = 0,
    deleting = false;
  function typeRole() {
    const current = roles[ri];
    if (!deleting) {
      eyebrowText.textContent = current.slice(0, ci++);
      if (ci > current.length) {
        deleting = true;
        setTimeout(typeRole, 2500);
        return;
      }
    } else {
      eyebrowText.textContent = current.slice(0, ci--);
      if (ci < 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        ci = 0;
      }
    }
    setTimeout(typeRole, deleting ? 30 : 60);
  }
  setTimeout(typeRole, 1500);
}

/* ── PAGE LOAD FADE ─────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity .6s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
});
