const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");
const formEl = document.getElementById("form");
const textEl = document.getElementById("text");
const amountEl = document.getElementById("amount");
const moneyPlusEl = document.getElementById("money-plus");
const moneyMinusEl = document.getElementById("money-minus");

// data
const dummytransactions = [
  { id: 1, text: "Date", amount: -15 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Coffee", amount: -5 },
];

let transactions = dummytransactions;

init();

// Add transaction to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transactions.amount < 0 ? "-" : "+";

  const itemEl = document.createElement("li");

  // Add class based on value
  itemEl.classList.add(transaction.amount < 0 ? "minus" : "plus");

  itemEl.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>
  `;

  listEl.appendChild(itemEl);
}

// Init app
function init() {
  listEl.innerHTML = ``;

  transactions.forEach(addTransactionDOM);
}
