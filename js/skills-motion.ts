import { skills } from "./skills.js";
const track = document.querySelector(".skills-track") as HTMLElement;
let position = 0;
let speed = 0.3;

function updateSpeed() {
  const rect = track.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const distance = Math.abs(rect.top - viewportCenter);

  // Farther from center = faster
  speed = Math.min(1.2, 0.2 + distance / 400);
}

function animateMotion() {
  updateSpeed();
  position -= speed;
  track.style.transform = `translateX(${position}px)`;

  // Reset loop
  if (Math.abs(position) > track.scrollWidth / 2) {
    position = 0;
  }

  requestAnimationFrame(animate);
}

animateMotion();
