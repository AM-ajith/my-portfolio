const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Subtle cursor glow on devices with a mouse.
const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.opacity = "1";
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

// GSAP animations. The page still works if the CDN is unavailable.
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-kicker", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out" });
  gsap.from(".hero-title span", {
    yPercent: 110, opacity: 0, duration: 1, stagger: 0.12,
    ease: "power4.out", delay: 0.1
  });
  gsap.from(".hero-shape", {
    scale: 0.7, rotation: 15, opacity: 0, duration: 1.2,
    ease: "power3.out", delay: 0.25
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    if (element.closest(".hero")) return;
    gsap.from(element, {
      y: 28, opacity: 0, duration: 0.75, ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  gsap.utils.toArray(".project-art").forEach((art) => {
    art.addEventListener("mouseenter", () => gsap.to(art, { scale: 1.012, duration: 0.35 }));
    art.addEventListener("mouseleave", () => gsap.to(art, { scale: 1, duration: 0.35 }));
  });
}
