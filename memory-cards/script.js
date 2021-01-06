const cardsContainerEl = document.getElementById("cards-container");
const prevBtnEl = document.getElementById("prev");
const nextBtnEl = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtnEl = document.getElementById("show");
const hideBtnEl = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtnEl = document.getElementById("add-card");
const clearBtnEL = document.getElementById("clear");
const addContainerEl = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Mock data
// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

createCards();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
  const cardEl = document.createElement("div");

  cardEl.classList.add("card");

  if (index === 0) cardEl.classList.add("active");

  cardEl.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
  `;

  cardEl.addEventListener("click", () =>
    cardEl.classList.toggle("show-answer")
  );

  cardsEl.push(cardEl);

  cardsContainerEl.appendChild(cardEl);

  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));

  return cards || [];
}

// Add card to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Event listener
nextBtnEl.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left"; // overriding

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1)
    currentActiveCard = cardsEl.length - 1;

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtnEl.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard -= 1;

  if (~currentActiveCard) currentActiveCard = 0;

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

showBtnEl.addEventListener("click", () => addContainerEl.classList.add("show"));

hideBtnEl.addEventListener("click", () =>
  addContainerEl.classList.remove("show")
);

addCardBtnEl.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainerEl.classList.remove("show");

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

clearBtnEl.addEventListener("click", () => {
  localStorage.clear();

  cardsContainerEl.innerHTML = ``;
  window.location.reload(); // refresh
});
