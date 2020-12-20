const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");
const formEl = document.getElementById("form");
const textEl = document.getElementById("text");
const amountEl = document.getElementById("amount");
const moneyPlusEl = document.getElementById("money-plus");
const moneyMinusEl = document.getElementById("money-minus");

// dummy data
// const dummytransactions = [
//   { id: 1, text: "Date", amount: -15 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Coffee", amount: -5 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

// [] -> true
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Generate random ID
function generateId() {
  return Math.floor(Math.random() * 1000000000); // 1 milion
}

init();

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (textEl.value.trim() === "" || amountEl.value.trim() === "")
    return alert("Please add a text and amount");

  const transaction = {
    id: generateId(),
    text: textEl.value,
    amount: +amountEl.value,
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);

  updateValues();

  updateLocalStorage();

  // reset
  textEl.value = "";
  amountEl.value = "";
}

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
  )}</span> <button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  listEl.appendChild(itemEl);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const totalAmounts = amounts
    .reduce((total, amount) => (total += amount), 0)
    .toFixed(2);

  const totalIncome = amounts
    .filter((amount) => amount > 0)
    .reduce((total, income) => (total += income), 0)
    .toFixed(2);

  const totalExpense = (
    amounts
      .filter((amount) => amount < 0)
      .reduce((total, expense) => (total += expense), 0) * -1
  ).toFixed(2);

  balanceEl.innerText = `$${totalAmounts}`;
  moneyPlusEl.innerText = `$${totalIncome}`;
  moneyMinusEl.innerText = `$${totalExpense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  // update data
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
  listEl.innerHTML = ``;

  transactions.forEach(addTransactionDOM);

  updateValues();
}

// Add event listener
formEl.addEventListener("submit", addTransaction);
