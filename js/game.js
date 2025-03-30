"use strict";

/**************************************
 * Maze Game: Image-based Collision + City Quizzes
 * - Visual background (any image)
 * - Dedicated collision map (black walls, white paths) for collision detection
 * - Player moves with arrow keys or movement buttons
 * - Up to 10 Albanian cities act as quiz checkpoints
 **************************************/

/* ---------- DOM Elements ---------- */
const timeShown = document.getElementById("time");
const livesShown = document.getElementById("lives");
const recordShown = document.getElementById("record");
const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const quizBox = document.getElementById("quizBox");
const cityNameEl = document.getElementById("cityName");
const cityFactEl = document.getElementById("cityFact");
const quizQuestionEl = document.getElementById("quizQuestion");
const quizAnswerEl = document.getElementById("quizAnswer");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const closeQuizBtn = document.getElementById("closeQuizBtn");

/* ---------- Game Variables ---------- */
let theGameStarted = false;
let currentLives = 5;
let totalGameTime = 0;
let currentRecord = Number(localStorage.getItem("record"));

timeShown.innerText = "--";
livesShown.innerText = "❤️".repeat(currentLives);
recordShown.innerText = currentRecord ? formatSeconds(currentRecord) : "--";

/* ---------- Images ---------- */
// Visual background image (can be any tourism-themed maze)
const backgroundImage = new Image();
backgroundImage.src = "img/background.png"; // Replace with your visual background image

// Collision map image (must be strictly black walls and white paths)
const collisionMap = new Image();
collisionMap.src = "img\simpleMaze.jpg"; // Replace with your collision map image

// Create an offscreen canvas for collision detection
const offscreenCanvas = document.createElement("canvas");
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
const offscreenCtx = offscreenCanvas.getContext("2d");

/* ---------- Player Configuration ---------- */
// const player = {
//   x: 50,
//   y: 550,
//   size: 20,
//   speed: 4,
//   color: "green"
// };
const player = {
  x: 50,
  y: 550,
  size: 50,
  speed: 4,
  // Instead of color, we use an image:
  image: new Image()
};
player.image.src = "img/stickman.jpg"; // Replace with your custom player icon


/* ---------- City Destinations (Quiz Data) ---------- */
const cities = [
  { name: "Tirana", x: 100, y: 100, fact: "Capital of Albania, known for Skanderbeg Square.", quizQ: "Which Albanian hero is honored in Tirana's main square?", quizA: "Gjergj Kastrioti Skanderbeg" },
  { name: "Berat", x: 200, y: 200, fact: "Known as the City of a Thousand Windows.", quizQ: "Why is Berat called 'the City of a Thousand Windows'?", quizA: "Because of its unique Ottoman-era houses." },
  { name: "Shkodër", x: 300, y: 300, fact: "Home to Rozafa Castle and Lake Shkodra.", quizQ: "What famous legend is tied to Rozafa Castle?", quizA: "The legend of a woman sacrificed to hold the walls." },
  { name: "Gjirokastër", x: 400, y: 200, fact: "UNESCO-listed stone city.", quizQ: "What is Gjirokastër's nickname?", quizA: "The City of Stone." },
  { name: "Sarandë", x: 500, y: 400, fact: "A seaside city near Butrint.", quizQ: "Which UNESCO site is near Sarandë?", quizA: "Butrint Archaeological Site." },
  { name: "Vlorë", x: 450, y: 120, fact: "Where Albanian independence was declared in 1912.", quizQ: "In which year was independence declared?", quizA: "1912" },
  { name: "Durrës", x: 350, y: 500, fact: "Albania's largest port city, featuring a Roman amphitheater.", quizQ: "What ancient structure is found in Durrës?", quizA: "A Roman amphitheater." },
  { name: "Krujë", x: 600, y: 100, fact: "Famous for its castle and Skanderbeg Museum.", quizQ: "Which museum is in Krujë?", quizA: "Skanderbeg Museum." },
  { name: "Korçë", x: 150, y: 350, fact: "Known as the birthplace of Albanian education.", quizQ: "What is Korçë known for?", quizA: "Its historic education institutions." },
  { name: "Himarë", x: 700, y: 300, fact: "A coastal town with Greek influences.", quizQ: "Which cultures blend in Himarë?", quizA: "Albanian and Greek." }
];

/* ---------- Input Handling ---------- */
let keys = {};
document.addEventListener("keydown", (e) => { keys[e.key] = true; });
document.addEventListener("keyup", (e) => { keys[e.key] = false; });

// Movement buttons for touch/click support
document.getElementById("up").addEventListener("click", () => simulateKey("ArrowUp"));
document.getElementById("down").addEventListener("click", () => simulateKey("ArrowDown"));
document.getElementById("left").addEventListener("click", () => simulateKey("ArrowLeft"));
document.getElementById("right").addEventListener("click", () => simulateKey("ArrowRight"));

function simulateKey(key) {
  keys[key] = true;
  setTimeout(() => { keys[key] = false; }, 100);
}

/* ---------- Maze & Collision Map Initialization ---------- */
// When collisionMap loads, draw it onto the offscreen canvas for collision detection
collisionMap.onload = () => {
  offscreenCtx.drawImage(collisionMap, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
};

// When the visual background image loads, start the game loop
backgroundImage.onload = () => {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  drawCities();
  drawPlayer();
  theGameStarted = true;
  startTimer();
  requestAnimationFrame(gameLoop);
};

/* ---------- Game Loop ---------- */
function gameLoop() {
  if (!theGameStarted) return;
  
  let newX = player.x;
  let newY = player.y;
  
  if (keys["ArrowUp"])    newY -= player.speed;
  if (keys["ArrowDown"])  newY += player.speed;
  if (keys["ArrowLeft"])  newX -= player.speed;
  if (keys["ArrowRight"]) newX += player.speed;
  
  // Only update the player position if the new position is valid (no collision)
  if (canMoveTo(newX, newY)) {
    player.x = newX;
    player.y = newY;
  }
  
  // Redraw the scene
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  drawCities();
  drawPlayer();
  
  // Check for collision with a city to trigger quiz
  checkCityCollision();
  
  requestAnimationFrame(gameLoop);
}

/* ---------- Collision Detection ---------- */
// Checks the player's four corners against the offscreen collision map
// function canMoveTo(x, y) {
//   const samples = [
//     [x, y],
//     [x + player.size, y],
//     [x, y + player.size],
//     [x + player.size, y + player.size]
//   ];
  
//   for (let [sx, sy] of samples) {
//     // Clamp sample points to canvas dimensions
//     let sampleX = Math.min(Math.max(sx, 0), canvas.width - 1);
//     let sampleY = Math.min(Math.max(sy, 0), canvas.height - 1);
    
//     let data = offscreenCtx.getImageData(sampleX, sampleY, 1, 1).data;
//     // Check if the pixel is black (a wall)
//     // Sum of RGB should be near 0 if black
//     let sum = data[0] + data[1] + data[2];
//     if (sum < 30) { // Adjust threshold as needed
//       return false;
//     }
//   }
//   return true;
// }
function canMoveTo(x, y) {
  return true;
}


/* ---------- Drawing Functions ---------- */
// function drawPlayer() {
//   ctx.fillStyle = player.color;
//   ctx.beginPath();
//   ctx.arc(player.x + player.size/2, player.y + player.size/2, player.size/2, 0, Math.PI*2);
//   ctx.fill();
// }
function drawPlayer() {
  // Draw the player image at the player's position
  ctx.drawImage(player.image, player.x, player.y, player.size, player.size);
}


function drawCities() {
  cities.forEach(city => {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(city.x, city.y, 8, 0, Math.PI*2);
    ctx.fill();
  });
}

/* ---------- City Collision & Quiz ---------- */
function checkCityCollision() {
  cities.forEach(city => {
    let dx = (player.x + player.size/2) - city.x;
    let dy = (player.y + player.size/2) - city.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 10) {
      openQuiz(city);
    }
  });
}

function openQuiz(city) {
  cityNameEl.innerText = city.name;
  cityFactEl.innerText = `Fact: ${city.fact}`;
  quizQuestionEl.innerText = `Quiz: ${city.quizQ}`;
  quizAnswerEl.innerText = `A: ${city.quizA}`;
  quizAnswerEl.classList.add("hidden");
  quizBox.classList.remove("hidden");
}

// Toggle answer visibility when "Show Answer" is clicked
showAnswerBtn.onclick = () => {
  quizAnswerEl.classList.toggle("hidden");
};

// Close quiz box when "Close" is clicked
closeQuizBtn.onclick = () => {
  quizBox.classList.add("hidden");
};

/* ---------- Timer & Record ---------- */
let currentTimer = null;
function startTimer() {
  totalGameTime = 0;
  timeShown.innerText = "";
  currentTimer = setInterval(() => {
    totalGameTime++;
    timeShown.innerText = formatSeconds(totalGameTime);
  }, 1000);
}

function formatSeconds(timeInSeconds) {
  const hrs = Math.floor(timeInSeconds / 3600);
  const mins = Math.floor((timeInSeconds % 3600) / 60);
  const secs = timeInSeconds % 60;
  let timeStr = "";
  if (hrs > 0) timeStr += `${hrs} h `;
  if (mins > 0) timeStr += `${mins} min `;
  timeStr += `${secs} s`;
  return timeStr;
}
