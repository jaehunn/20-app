const yearEl = document.getElementById("year");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownEl = document.getElementById("countdown");
const loadingEl = document.getElementById("loading");

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

updateCountdown();

year.innerText = currentYear + 1;

function updateCountdown() {
  const currentTime = new Date();
  const d = (newYearTime - currentTime) / 1000;

  const dDays = Math.floor(d / 60 / 60 / 24); // ms -> sec -> min -> hour -> day
  const dHours = Math.floor(d / 60 / 60) % 24;
  const dMins = Math.floor(d / 60) % 60;
  const dSecs = Math.floor(d) % 60;

  daysEl.innerHTML = dDays;
  hoursEl.innerHTML = dHours < 10 ? "0" + dHours : dHours;
  minutesEl.innerHTML = dMins < 10 ? "0" + dMins : dMins;
  secondsEl.innerHTML = dSecs < 10 ? "0" + dSecs : dSecs;
}

setTimeout(() => {
  loadingEl.remove();

  countdownEl.style.display = "flex";
}, 1000);

setInterval(updateCountdown, 1000);
