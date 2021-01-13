// @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
// @see about:config (firefox browser)

const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();
console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

function onSpeak(e) {
  let msg = e.results[0][0].transcript;

  if (msg === "일") msg = 1;
  if (msg === "이") msg = 2;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
  const num = +msg;

  // not a number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";

    return;
  }

  // out of range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";

    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>It was ${num}</h2>
        <button id="play-again" id=play-again">Play Again</button>
      `;
  }
  msgEl.innerHTML +=
    num > randomNum ? `<div>Go LOWER</div>` : `<div>Go HIGHER</div>`;
}

function getRandomNumber() {
  return ((Math.random() * 100) << 0) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// Keep starting
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") window.location.reload();
});
