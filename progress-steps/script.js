const progressEl = document.getElementById("progress");
const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");
const circleEls = document.querySelectorAll(".circle");

let currentActiveIndex = 0;

nextEl.addEventListener("click", () => {
  currentActiveIndex += 1;

  if (currentActiveIndex >= circleEls.length) currentActiveIndex = circleEls.length - 1; // stop

  updateProgress();
});

prevEl.addEventListener("click", () => {
  currentActiveIndex -= 1;

  if (currentActiveIndex < 0) currentActiveIndex = 0;

  updateProgress();
});

function updateProgress() {
  circleEls.forEach((circleEl, index) => {
    if (index <= currentActiveIndex) circleEl.classList.add("active");
    else circleEl.classList.remove("active");
  });

  const activeEls = document.querySelectorAll(".active");

  progressEl.style.width = ((activeEls.length - 1) / (circleEls.length - 1)) * 100 + "%"; // 33.3%

  if (currentActiveIndex === 0) {
    prevEl.disabled = true; // start
  } else if (currentActiveIndex === circleEls.length - 1) {
    nextEl.disabled = true; // end
  } else {
    prevEl.disabled = false;
    nextEl.disabled = false;
  }
}
