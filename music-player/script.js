const musicContainerEl = document.getElementById("music-container");
const prevBtnEl = document.getElementById("prev");
const playBtnEl = document.getElementById("play");
const nextBtnEl = document.getElementById("next");
const audioEl = document.getElementById("audio");
const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");
const titleEl = document.getElementById("title");
const coverEl = document.getElementById("cover");

// data
const songs = ["hey", "summer", "ukulele"]; // match img jpg

// Keep track of song
let songIndex = 1;

// Initially load song detail into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  titleEl.innerText = song;

  audioEl.src = `music/${song}.mp3`;
  coverEl.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainerEl.classList.add("play"); // img

  // btn
  playBtnEl.querySelector("i.fas").classList.remove("fa-play");
  playBtnEl.querySelector("i.fas").classList.add("fa-pause");

  audioEl.play(); // song
}

// Pause Song
function pauseSong() {
  musicContainerEl.classList.remove("play");

  playBtnEl.querySelector("i.fas").classList.add("fa-play");
  playBtnEl.querySelector("i.fas").classList.remove("fa-pause");

  audioEl.pause();
}

// Previous song
function prevSong() {
  songIndex -= 1;

  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong(songs[songIndex]);

  playSong();
}

// Next Song
function nextSong() {
  songIndex += 1;

  if (songIndex > songs.length - 1) songIndex = 0;

  loadSong(songs[songIndex]);

  playSong();
}

// Update Progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progressEl.style.width = `${progressPercent}%`;
}

// Set Progress bar
function setProgress(e) {
  const totalWidth = this.clientWidth; // total width
  const clickX = e.offsetX;
  const duration = audioEl.duration;

  audioEl.currentTime = (clickX / totalWidth) * duration;
}

// Event listenres
playBtnEl.addEventListener("click", () =>
  musicContainerEl.classList.contains("play") ? pauseSong() : playSong()
);

prevBtnEl.addEventListener("click", prevSong);
nextBtnEl.addEventListener("click", nextSong);

audioEl.addEventListener("timeupdate", updateProgress);

progressContainerEl.addEventListener("click", setProgress);

audioEl.addEventListener("ended", nextSong);
