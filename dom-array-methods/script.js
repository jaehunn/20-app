const mainEl = document.getElementById("main");
const addUserBtnEl = document.getElementById("add-user");
const doubleBtnEl = document.getElementById("double");
const showMillionairesBtnEl = document.getElementById("show-millionaires");
const sortBtnEl = document.getElementById("sort");
const calculateWealthBtnEl = document.getElementById("calculate-wealth");

let data = [];

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map((user) => ({ ...user, money: user.money * 2 }));

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  // sort() is mutable method
  data.sort((next, prev) => prev.money - next.money); // desc

  updateDOM();
}

// Filter by only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((total, user) => (total += user.money), 0);
  const totalWealthEl = document.querySelector("#main > .total-wealth");

  // if exist -> not add
  // null is falsy
  if (!totalWealthEl && typeof totalWealthEl === "object") {
    const wealthEl = document.createElement("div");
    wealthEl.classList.add("total-wealth");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;

    mainEl.appendChild(wealthEl);
  }
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  mainEl.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((data) => {
    const personEl = document.createElement("div");
    personEl.classList.add("person");
    personEl.innerHTML = `<strong>${data.name}</strong> ${formatMoney(
      data.money
    )}`;

    mainEl.appendChild(personEl);
  });
}

// Format number as money
// @see https://stackoverflow.com/questions/149055/how-toformat-numbers-as-currency-string
function formatMoney(money) {
  return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

// Event listener
addUserBtnEl.addEventListener("click", getRandomUser);
doubleBtnEl.addEventListener("click", doubleMoney);
sortBtnEl.addEventListener("click", sortByRichest);
showMillionairesBtnEl.addEventListener("click", showMillionaires);
calculateWealthBtnEl.addEventListener("click", calculateWealth);
