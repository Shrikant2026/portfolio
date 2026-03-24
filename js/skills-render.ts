import { skills } from "./skills.js";

const track = document.getElementById("skillsTrack") as HTMLElement;

// Duplicate for infinite scroll
const allSkills = [...skills, ...skills];

allSkills.forEach(skill => {
  const item = document.createElement("div");
  item.className = "skill-item";

  item.innerHTML = `
    <span class="connector"></span>
    <div class="skill-box" data-tooltip="${skill.production ? "Used in production" : ""}">
      <i class="${skill.icon}"></i>
      <p>${skill.name}</p>
    </div>
  `;

  track.appendChild(item);
});
