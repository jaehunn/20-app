const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtnEl = document.getElementById("play-button");
const popupEl = document.getElementById("popup-container");
const notificationEl = document.getElementById("notification-container");
const finalMessageEl = document.getElementById("final-message");

const figurePartEls = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// input
const correctLetters = [];
const wrongLetters = [];

displayWord();

// Keydown letter press
window.addEventListener("keydown", (e) => {
  // e.keyCode -> ASCII

  if (e.key >= "a" && e.key <= "z") {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else showNotification();
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else showNotification();
    }
  }
});

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </span>
        `
          )
          .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, ""); // '\n' -> ''

  if (innerWord === selectedWord) {
    finalMessageEl.innerText = "Congratulations! You Won!";

    popupEl.style.display = "flex"; // none -> flex
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
        ${wrongLetters.length ? `<p>Wrong</p>` : " "}
        ${
          !!wrongLetters &&
          wrongLetters.map((wrongLetter) => `<span>${wrongLetter}</span>`)
        }
    `;

  // Display parts
  figurePartEls.forEach((partEl, num) => {
    const errors = wrongLetters.length;

    if (num < errors) partEl.style.display = "block";
    else partEl.style.display = "none";
  });

  // Check if lost
  if (wrongLetters.length === figurePartEls.length) {
    finalMessageEl.innerText = "Unfortunately you lost...";

    popupEl.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notificationEl.classList.add("show");

  setTimeout(() => notificationEl.classList.remove("show"), 2000);
}

// Restart game and play again
playAgainBtnEl.addEventListener("click", (e) => {
  // Empty arrays: B = A.splice() => A = [] / B = [...]
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popupEl.style.display = "none";
});
