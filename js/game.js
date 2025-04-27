"use strict";

/**************************************
 * Maze Game: Grid-Based Maze with City Quizzes
 * - Maze is structured as a grid (10x10)
 * - 10 Albanian cities (checkpoints) are embedded in the maze.
 * - When the player reaches a city cell, a quiz with three choices pops up.
 *   • Correct answer (regular city): The cell becomes a path and two fun facts are shown.
 *   • Incorrect answer: One life is lost.
 * - When all 10 cities are visited, a bonus prompt modal appears and unlocks a hidden destination.
 *   After correctly answering its quiz, a final win modal (with trophy and restart button) appears.
 **************************************/

/* ---------- Global DOM Elements ---------- */
const mazeContainer = document.getElementById("maze");
const livesDisplay = document.getElementById("lives");
const visitedDisplay = document.getElementById("visited");
const quizModal = document.getElementById("quiz-modal");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const closeQuizBtn = document.getElementById("closeQuizBtn");
const cityInfoBox = document.getElementById("city-info-box");

// Welcome modal elements
const welcomeModal = document.getElementById("welcome-modal");
const startGameBtn = document.getElementById("startGameBtn");

// Bonus prompt modal elements
const bonusPromptModal = document.getElementById("bonus-prompt-modal");
const bonusContinueBtn = document.getElementById("bonusContinueBtn");

// Final win modal elements
const finalWinModal = document.getElementById("final-win-modal");
const finalWinRestartBtn = document.getElementById("finalWinRestartBtn");

/* ---------- Game Variables ---------- */
let lives = 3;
let visitedCities = [];
const totalCities = 10;
// This flag prevents showing the bonus prompt more than once.
let bonusUnlocked = false;

/* ---------- Original Maze Setup ---------- */
const originalMaze = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,2,1,1,1,1,1,2,0],
  [0,1,1,1,0,0,1,0,0,0],
  [0,0,0,2,1,1,1,2,0,0],
  [0,1,1,1,1,2,1,1,1,0],
  [0,1,2,1,1,1,1,1,1,0],
  [0,0,0,0,2,1,1,1,1,0],
  [0,2,1,1,1,1,0,0,2,0],
  [0,1,1,1,1,1,2,1,1,0],
  [0,0,0,0,0,0,0,0,0,0]
];
// Use a mutable copy of the maze for gameplay:
let maze = JSON.parse(JSON.stringify(originalMaze));

const rows = maze.length;
const cols = maze[0].length;

/* ---------- City Data (Now With Icons, Two Fun Facts, and Bonus Flag) ---------- */
const cities = [
  {
    name: "Tirana",
    row: 1,
    col: 2,
    fact: "Tirana is the capital of Albania, famed for the expansive Skanderbeg Square.",
    fact2: "Its vibrant Pazari i Ri market and colorful murals bring the city’s streets to life.",
    question: "Which Albanian hero is celebrated at Tirana’s Skanderbeg Square?",
    options: ["Gjergj Kastrioti Skanderbeg", "Ismail Qemali", "Mother Teresa"],
    answer: "Gjergj Kastrioti Skanderbeg",
    icon: "img/tiranaSymbol.jpg"
  },
  {
    name: "Berat",
    row: 1,
    col: 8,
    fact: "Berat is nicknamed the City of a Thousand Windows due to its distinct Ottoman architecture.",
    fact2: "Its hillside neighborhoods offer sweeping views of the winding Osum River.",
    question: "What architectural feature gives Berat its famous nickname?",
    options: ["Intricate archways", "The multitude of windows on traditional houses", "Modern glass structures"],
    answer: "The multitude of windows on traditional houses",
    icon: "img/berati.jpg"
  },
  {
    name: "Shkodër",
    row: 3,
    col: 3,
    fact: "Shkodër houses the ancient Rozafa Castle, steeped in local legend.",
    fact2: "The city also bursts with artistic energy and historical richness dating back millennia.",
    question: "Which historic monument in Shkodër is wrapped in legend?",
    options: ["Rozafa Castle", "The Clock Tower", "A Roman Forum"],
    answer: "Rozafa Castle",
    icon: "img/shkodra.jpg"
  },
  {
    name: "Gjirokastër",
    row: 3,
    col: 7,
    fact: "Gjirokastër is a UNESCO-listed town celebrated for its enduring stone architecture.",
    fact2: "Its winding cobbled streets and traditional houses transport visitors back in time.",
    question: "Which nickname best captures the essence of Gjirokastër’s historic charm?",
    options: ["The City of Bridges", "The City of Windows", "The City of Stone"],
    answer: "The City of Stone",
    icon: "img/gjirokaster.jpg"
  },
  {
    name: "Sarandë",
    row: 4,
    col: 5,
    fact: "Sarandë is a seaside haven with glistening azure waters.",
    fact2: "It offers breathtaking sunsets over the Ionian Sea and serves as a gateway to ancient ruins.",
    question: "Which UNESCO site is located near Sarandë?",
    options: ["Butrint", "Krujë", "Durrës"],
    answer: "Butrint",
    icon: "img/saranda.jpg"
  },
  {
    name: "Vlorë",
    row: 5,
    col: 2,
    fact: "Vlorë is historically significant as the site of Albania’s declaration of independence in 1912.",
    fact2: "This bustling port city played a pivotal role in shaping modern Albania.",
    question: "In which year did Vlorë witness the birth of modern Albania?",
    options: ["1912", "1920", "1908"],
    answer: "1912",
    icon: "img/vlore.jpg"
  },
  {
    name: "Durrës",
    row: 6,
    col: 4,
    fact: "Durrës stands as Albania’s largest port city, rich with remnants of the Roman era.",
    fact2: "Its impressive Roman amphitheater is one of the largest in the Balkans.",
    question: "What iconic relic from the Roman era can be found in Durrës?",
    options: ["A Greek temple", "Roman amphitheater", "Medieval fortress"],
    answer: "Roman amphitheater",
    icon: "img/durres.jpg"
  },
  {
    name: "Krujë",
    row: 7,
    col: 1,
    fact: "Krujë is famed for its imposing medieval castle and the Skanderbeg Museum.",
    fact2: "From its heights, the castle offers sweeping views of the rugged Albanian mountains.",
    question: "Which museum in Krujë is dedicated to Albania's national hero?",
    options: ["Skanderbeg Museum", "History Museum", "Art Museum"],
    answer: "Skanderbeg Museum",
    icon: "img/kruje.jpg"
  },
  {
    name: "Korçë",
    row: 7,
    col: 8,
    fact: "Korçë is celebrated as the cradle of Albanian education and a cultural melting pot.",
    fact2: "It also hosts a vibrant annual beer festival that honors local traditions.",
    question: "Apart from education, what cultural event is Korçë known for?",
    options: ["Ancient ruins tour", "Vibrant cultural festivals", "Traditional craft markets"],
    answer: "Vibrant cultural festivals",
    icon: "img/korce.jpg"
  },
  {
    name: "Himarë",
    row: 8,
    col: 6,
    fact: "Himarë is a coastal gem where Greek and Albanian influences effortlessly blend.",
    fact2: "Its pristine beaches and rustic charm make it one of Albania’s hidden paradises.",
    question: "Which cultural influences are most evident in Himarë’s coastal heritage?",
    options: ["Albanian and Greek", "Albanian and Italian", "Greek and Turkish"],
    answer: "Albanian and Greek",
    icon: "https://cdn-icons-png.flaticon.com/512/235/235861.png"
  },
  // Bonus destination—hidden until unlocked:
  {
    name: "The Blue Eye",
    row: 5,       
    col: 8,
    fact: "The Blue Eye, also known as Syri i Kaltër, mesmerizes with its deep, crystal-clear blue waters.",
    fact2: "Its mystical allure and unique natural formation have made it one of Albania's must-see wonders.",
    question: "Which natural wonder is known as The Blue Eye?",
    options: ["Syri i Kaltër", "The Blue Lagoon", "The Blue Fountain"],
    answer: "Syri i Kaltër",
    icon: "img/questionMark.jpg",
    bonus: true
  }
];


/* ---------- Player Starting Position ---------- */
let playerRow = 1;
let playerCol = 1;

/* ---------- Maze Drawing ---------- */
function drawMaze() {
  mazeContainer.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      
      // Determine cell type
      if (maze[r][c] === 0) {
        cell.classList.add("wall");
      } else if (maze[r][c] === 1) {
        cell.classList.add("path");
      } else if (maze[r][c] === 2) {
        cell.classList.add("city");
        const cityObj = cities.find(city => city.row === r && city.col === c);
        const img = document.createElement("img");
        img.src = cityObj && cityObj.icon ? cityObj.icon : "img/default-city-icon.png";
        img.alt = cityObj ? cityObj.name : "City";
        img.classList.add("city-icon");
        cell.appendChild(img);
      }
      
      // Place the player image if this is the player's position.
      if (r === playerRow && c === playerCol) {
        const playerImg = document.createElement("img");
        playerImg.src = "img/DoraTheExplorer-removebg-preview.png";
        playerImg.alt = "Doraa";
        playerImg.classList.add("player-icon");
        cell.appendChild(playerImg);
        
        // If this cell is a city (regular or bonus) add the glow effect
        const cityObj = cities.find(city => city.row === r && city.col === c);
        if (cityObj) {
          cell.classList.add("active-city");
        }
      }
      
      mazeContainer.appendChild(cell);
    }
  }
}

/* ---------- Player Movement ---------- */
document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
  if (!quizModal.classList.contains("hidden")) return;

  let newRow = playerRow;
  let newCol = playerCol;

  switch (event.key) {
    case "ArrowUp": newRow--; break;
    case "ArrowDown": newRow++; break;
    case "ArrowLeft": newCol--; break;
    case "ArrowRight": newCol++; break;
    default: return;
  }

  if (maze[newRow] && (maze[newRow][newCol] === 1 || maze[newRow][newCol] === 2)) {
    playerRow = newRow;
    playerCol = newCol;
    drawMaze();
    checkCityCollision();
  }
}

/* ---------- City Collision & Quiz ---------- */
function checkCityCollision() {
  if (maze[playerRow][playerCol] === 2) {
    const city = cities.find(city => city.row === playerRow && city.col === playerCol);
    if (city) {
      showQuiz(city);
    }
  }
}

function showQuiz(city) {
  quizModal.classList.remove("hidden");
  quizQuestion.textContent = city.question;
  quizOptions.innerHTML = "";
  city.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("answer-btn");
    btn.onclick = () => handleAnswer(option, city);
    quizOptions.appendChild(btn);
  });
}

closeQuizBtn.addEventListener("click", () => {
  quizModal.classList.add("hidden");
});

function handleAnswer(selected, city) {
  if (selected === city.answer) {
    // Check if this is the bonus destination
    if (city.bonus) {
      // For bonus city, first display fun facts in the city info box
      showCityInfo(city.name, `Did you know: ${city.fact}`, `${city.fact2}`);
      // After a brief delay, show the final win modal
      setTimeout(() => {
        showFinalWin();
      }, 1000);
    } else {
      // Regular city: update maze and visitedCities then display fun facts
      maze[city.row][city.col] = 1;
      if (!visitedCities.includes(city.name)) {
        visitedCities.push(city.name);
      }
      showCityInfo(city.name, `Did you know: ${city.fact}`, `${city.fact2}`);
    }
  } else {
    // Incorrect answer:
    lives--;
    updateLives();
    showCityInfo("❌ Oops!", "Incorrect answer! You lost a life.");
    
    if (lives <= 0) {
      showGameOver();
      quizModal.classList.add("hidden");
      return;
    }
  }
  quizModal.classList.add("hidden");
  drawMaze();
  updateVisited();
  
  // If all regular cities have been visited and bonus not yet unlocked, prompt bonus.
  if (visitedCities.length === totalCities && !bonusUnlocked) {
    bonusUnlocked = true;
    promptBonus();
  }
}


/* ---------- Show City Info ---------- */
function showCityInfo(title, fact1, fact2 = "") {
  let infoHTML = `<strong>Visited:</strong> ${title}<br>`;
  infoHTML += `<p>${fact1}</p>`;
  if (fact2) {
    infoHTML += `<p>${fact2}</p>`;
  }
  cityInfoBox.innerHTML = infoHTML;
  cityInfoBox.classList.remove("hidden");
}

/* ---------- Game Over Functionality ---------- */
function showGameOver() {
  const gameOverModal = document.getElementById("gameover-modal");
  gameOverModal.classList.remove("hidden");
}

/* ---------- Bonus Prompt and Final Win Functionality ---------- */
function promptBonus() {
  // Unlock bonus destination by updating the maze at bonus coordinates.
  unlockBonusDestination();
  // Show bonus prompt modal to inform the player.
  bonusPromptModal.classList.remove("hidden");
}

function unlockBonusDestination() {
  const bonusCity = cities.find(city => city.bonus);
  if (bonusCity) {
    // Change the cell to a city
    maze[bonusCity.row][bonusCity.col] = 2;
    drawMaze();
    // Optionally, you could also display a message or fun fact about the bonus city here.
  }
}

function showFinalWin() {
  // Show final win modal with trophy reward.
  finalWinModal.classList.remove("hidden");
  const rewardContainer = document.getElementById("reward");
  if (rewardContainer) {
    rewardContainer.innerHTML = `<div class="reward-animation">🏆 </div>`;
  }
}

/* ---------- Restart Game Functionality ---------- */
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restartGame);

if (finalWinRestartBtn) {
  finalWinRestartBtn.addEventListener("click", restartGame);
}

function restartGame() {
  lives = 3;
  visitedCities = [];
  bonusUnlocked = false;
  playerRow = 1;
  playerCol = 1;
  
  maze = JSON.parse(JSON.stringify(originalMaze));
  
  document.getElementById("gameover-modal").classList.add("hidden");
  finalWinModal.classList.add("hidden");
  bonusPromptModal.classList.add("hidden");
  
  document.addEventListener("keydown", movePlayer);
  
  updateLives();
  updateVisited();
  drawMaze();
  cityInfoBox.classList.add("hidden");
}

/* ---------- Welcome Modal Functionality ---------- */
startGameBtn.addEventListener("click", () => {
  welcomeModal.classList.add("hidden");
});

/* ---------- Continue Button for Bonus Prompt ---------- */
if (bonusContinueBtn) {
  bonusContinueBtn.addEventListener("click", () => {
    bonusPromptModal.classList.add("hidden");
  });
}

/* ---------- Utility Functions ---------- */
function updateLives() {
  livesDisplay.textContent = "❤️".repeat(lives);
}

function updateVisited() {
  visitedDisplay.textContent = visitedCities.length;
}

/* ---------- Initialize ---------- */
drawMaze();
updateLives();
updateVisited();

// Show the welcome modal on initial load
welcomeModal.classList.remove("hidden");
