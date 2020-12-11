const currencyOneEl = document.getElementById("currency-one");
const amountOneEl = document.getElementById("amount-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountTwoEl = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;

  // @see https://exchangeratesapi.io/
  fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];

      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountTwoEl.value = (amountOneEl.value * rate).toFixed(2);
    });
}

// Evenet listeners
currencyOneEl.addEventListener("change", calculate);
amountOneEl.addEventListener("input", calculate);

currencyTwoEl.addEventListener("change", calculate);
amountTwoEl.addEventListener("input", calculate);

swapEl.addEventListener(
  "click",
  () =>
    ([currencyOneEl.value, currencyTwoEl.value] = [
      currencyTwoEl.value,
      currencyOneEl.value,
    ])
);

calculate();
