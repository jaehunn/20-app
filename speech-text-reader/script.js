// @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

const mainEl = document.querySelector("main");
const voicesSelectEl = document.getElementById("voices");
const textEl = document.getElementById("text");
const readBtnEl = document.getElementById("read");
const toggleBtnEl = document.getElementById("toggle");
const closeBtnEl = document.getElementById("close");

// static
const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox({ image, text }) {
  const boxEl = document.createElement("div");

  boxEl.classList.add("box");
  boxEl.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  // @TODO - speak event

  mainEl.appendChild(boxEl);
}
