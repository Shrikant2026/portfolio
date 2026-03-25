/* =========================
   SKILLS DATA
========================= */

const skills = [
  { name: "PHP", icon: "devicon-php-plain" },
  { name: "CodeIgniter 4", icon: "devicon-codeigniter-plain" },
  { name: "MySQL", icon: "devicon-mysql-plain" },
  { name: "Redis", icon: "devicon-redis-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "Socket.IO", icon: "devicon-socketio-original" },
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "jQuery", icon: "devicon-jquery-plain" },
  { name: "Nginx", icon: "devicon-nginx-original" },
  { name: "Apache", icon: "devicon-apache-plain" },
  { name: "Git & GitHub", icon: "devicon-git-plain" },
  { name: "Postman", icon: "devicon-postman-plain" },
  { name: "Cron Jobs", icon: "devicon-linux-plain" }
];

/* =========================
   RENDER SKILLS (DUPLICATE)
========================= */

const track = document.getElementById("skillsTrack");
const allSkills = [...skills, ...skills];

allSkills.forEach(skill => {
  const item = document.createElement("div");
  item.className = "skill-item";

  item.innerHTML = `
    <span class="connector"></span>
    <div class="skill-box">
      <i class="${skill.icon}"></i>
      <p>${skill.name}</p>
    </div>
  `;

  track.appendChild(item);
});

/* =========================
   INFINITE SCROLL + SPEED
========================= */

let x = 0;
let speed = 0.4;

function animateSkills() {
  const rect = track.getBoundingClientRect();
  const center = window.innerHeight / 2;
  const distance = Math.abs(rect.top - center);

  speed = Math.min(1.5, 0.3 + distance / 300);
  x -= speed;

  if (Math.abs(x) > track.scrollWidth / 2) {
    x = 0;
  }

  track.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animateSkills);
}

animateSkills();

/* =========================
   THREE.JS INFINITY
========================= */

const canvas = document.getElementById("infinityCanvas");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

class InfinityCurve extends THREE.Curve {
  getPoint(t) {
    return new THREE.Vector3(
      Math.sin(t * Math.PI * 2) * 2.2,
      Math.sin(t * Math.PI * 4) / 2,
      0
    );
  }
}

function resizeInfinity() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

resizeInfinity();
window.addEventListener("resize", resizeInfinity);


const geometry = new THREE.TubeGeometry(new InfinityCurve(), 200, 0.08, 16, true);

const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,
  emissive: 0x2563eb,
  emissiveIntensity: 0.8,
  metalness: 0.6,
  roughness: 0.25
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.PointLight(0x60a5fa, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

function animateInfinity() {
  mesh.rotation.y += 0.003;
  mesh.rotation.x += 0.0015;

  material.emissiveIntensity = 0.6 + Math.abs(Math.sin(Date.now() * 0.002)) * 0.4;
  renderer.render(scene, camera);

  requestAnimationFrame(animateInfinity);
}

animateInfinity();

const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
links.classList.toggle("active");
});