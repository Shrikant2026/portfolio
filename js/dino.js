const gameCanvas = document.getElementById("dinoGame");
const ctx = gameCanvas.getContext("2d");
const dinoImg = new Image();
const cactusImg = new Image();

dinoImg.src = "assets/dino/dino.svg";
cactusImg.src = "assets/dino/cactus.svg";

let imagesLoaded = false;

dinoImg.onload = () => {
  cactusImg.onload = () => {
    imagesLoaded = true;
  };
};

gameCanvas.width = 800;
gameCanvas.height = 200;

function resizeCanvas() {
  gameCanvas.width = gameCanvas.parentElement.clientWidth;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let playerName = "";
let score = 0;
let gameRunning = false;

const dino = {
  x: 50,
  y: 150,
  width: 44,
  height: 44,
  dy: 0,
  gravity: 0.6,
  jumpPower: -12,
  grounded: true
};

const obstacles = [];

function spawnObstacle() {
  obstacles.push({
    x: gameCanvas.width,
    y: 160,
    width: 20,
    height: 40
  });
}

function drawDino() {
  ctx.drawImage(
    dinoImg,
    dino.x,
    dino.y,
    dino.width,
    dino.height
  );
}

function drawObstacles() {
  ctx.fillStyle = "#ef4444";

  obstacles.forEach((obs, index) => {
    ctx.drawImage(
        cactusImg,
        obs.x,
        obs.y,
        obs.width,
        obs.height
    );

    let gameSpeed = 3;

    obs.x -= gameSpeed;
    gameSpeed += 0.0005;

    if (obs.x + obs.width < 0) {
      obstacles.splice(index, 1);
      score++;
      document.getElementById("score").textContent = score;
    }

    if (
      dino.x < obs.x + obs.width &&
      dino.x + dino.width > obs.x &&
      dino.y < obs.y + obs.height &&
      dino.y + dino.height > obs.y
    ) {
      gameOver();
    }
  });
}

function updateDino() {
  dino.y += dino.dy;

  if (dino.y + dino.height >= gameCanvas.height) {
    dino.y = gameCanvas.height - dino.height;
    dino.dy = 0;
    dino.grounded = true;
  } else {
    dino.dy += dino.gravity;
    dino.grounded = false;
  }
}

function jump() {
  if (dino.grounded) {
    dino.dy = -12;
    dino.grounded = false;
  }
}

function gameLoop() {
  if (!gameRunning || !imagesLoaded) return;

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  drawDino();
  drawObstacles();
  updateDino();

  requestAnimationFrame(gameLoop);
}

function gameOver() {
  gameRunning = false;
  saveScore();
}

function saveScore() {
  console.log("Score:", score);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    jump();
  }
});


function spawnRandomObstacle() {
  spawnObstacle();
  setTimeout(spawnRandomObstacle, 1200 + Math.random() * 1500);
}

spawnRandomObstacle();

document.getElementById("startGame").addEventListener("click", () => {
  playerName = document.getElementById("playerName").value || "Anonymous";
  score = 0;
  obstacles.length = 0;
  gameRunning = true;
  gameLoop();
});