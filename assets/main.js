const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("[data-nav-link]").forEach((link) => {
  const target = link.getAttribute("href");
  if (target === currentPage || (currentPage === "" && target === "index.html")) {
    link.classList.add("active");
  }
});

document
  .querySelectorAll(".card-grid > .card, .timeline .timeline-item, .project-card, .contact-layout > .contact-panel")
  .forEach((el) => el.classList.add("reveal"));

const revealElements = [...document.querySelectorAll(".reveal")];
const revealWithStagger = document.querySelectorAll("#education .card.reveal, #expertise .card.reveal");
revealWithStagger.forEach((el, idx) => {
  const delay = (idx % 3) * 0.09;
  el.style.setProperty("--reveal-delay", `${delay}s`);
});

const projectCards = document.querySelectorAll(".projects-page .project-card.reveal");
projectCards.forEach((el, idx) => {
  const delay = idx * 0.08;
  el.style.setProperty("--reveal-delay", `${delay}s`);
});

const revealIfInView = (el) => {
  if (el.classList.contains("is-visible")) return;
  const rect = el.getBoundingClientRect();
  if (rect.top <= window.innerHeight * 0.9) {
    el.classList.add("is-visible");
  }
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
  );
  revealElements.forEach((el) => observer.observe(el));
}

const revealOnScroll = () => {
  revealElements.forEach((el) => revealIfInView(el));
};

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("resize", revealOnScroll);
window.addEventListener("load", () => {
  setTimeout(revealOnScroll, 60);
});

revealOnScroll();

const contactForm = document.querySelector("#contactForm");
if (contactForm && !contactForm.hasAttribute("action")) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = contactForm.querySelector("#name").value.trim();
    const email = contactForm.querySelector("#email").value.trim();
    const message = contactForm.querySelector("#message").value.trim();

    const subject = encodeURIComponent(`Portfolio Contact - ${name || "New message"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:stinnium@alumni.cmu.edu?subject=${subject}&body=${body}`;
  });
}
