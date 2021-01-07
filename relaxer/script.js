const containerEl = document.getElementById("container");
const textEl = document.getElementById("text");

const totalTime = 7500; // 7.5s
const breatheTime = (totalTime / 5) * 2; // 2/5 -> 3s
const holdTime = totalTime / 5; // 1/5 -> 1.5s

breatheAnimation();
setInterval(breatheAnimation, totalTime); // repeat

function breatheAnimation() {
  // 1
  textEl.innerText = "Breathe In!";
  containerEl.className = "container grow"; // overriding

  setTimeout(() => {
    // 2
    textEl.innerText = "Hold";
    setTimeout(() => {
      // 3
      textEl.innerText = "Breathe Out!";
      containerEl.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}
