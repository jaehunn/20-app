const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameContainerEl = document.getElementById("end-game-container");
const settingsBtnEl = document.getElementById("settings-btn");
const settingsEl = document.getElementById("settings");
const settingsFormEl = document.getElementById("settings-form");
const difficultySelectEl = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Init
let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem("difficulty") || "medium";

// Set difficulty select value
difficultySelectEl.value = difficulty;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from arry
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();

  wordEl.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score += 1;

  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time -= 1;

  timeEl.innerHTML = time + "s";

  if (time < 1) {
    clearInterval(timeInterval);

    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endGameContainerEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endGameContainerEl.style.display = "flex";
}

addWordToDOM();

// Event listeners
textEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (e.target.value === randomWord) {
      addWordToDOM();
      updateScore();

      // Clear
      e.target.value = "";

      //   switch (difficulty) {
      //     case "hard":
      //       return (time += 2);
      //     case "medium":
      //       return (time += 3);
      //     case "easy":
      //       return (time += 5);
      //   }

      difficulty === "hard"
        ? (time += 2)
        : difficulty === "medium"
        ? (time += 3)
        : (time += 5); // easy

      updateTime();
    }
  }
});

settingsBtnEl.addEventListener("click", () => {
  settingsEl.classList.toggle("hide");
});

settingsFormEl.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
