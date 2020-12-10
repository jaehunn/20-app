const videoEl = document.getElementById("video");
const playBtnEl = document.getElementById("play");
const stopBtnEl = document.getElementById("stop");
const progressEl = document.getElementById("progress");
const timestampEl = document.getElementById("timestamp");

// Play & Pause video
function toggleVideoStatus() {
  if (videoEl.paused) videoEl.play();
  else videoEl.pause();
}

// Update play/pause icon
function updatePlayIcon() {
  if (videoEl.paused) playBtnEl.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  else playBtnEl.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
}

// Update progress & timestamp
function updateProgress() {
  progressEl.value = (videoEl.currentTime / videoEl.duration) * 100; // percentage

  // Get min
  let mins = (videoEl.currentTime / 60) << 0; // floor
  if (mins < 10) mins = "0" + mins;

  // Get seconds
  let secs = videoEl.currentTime % 60 << 0;
  if (secs < 10) secs = "0" + secs;

  timestampEl.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  videoEl.currentTime = (+progressEl.value * videoEl.duration) / 100;
}

// Stop video
function stopVideo() {
  videoEl.currentTime = 0;

  videoEl.pause();
}

// Event listeners
videoEl.addEventListener("click", toggleVideoStatus);
videoEl.addEventListener("play", updatePlayIcon);
videoEl.addEventListener("pause", updatePlayIcon);
videoEl.addEventListener("timeupdate", updateProgress);

playBtnEl.addEventListener("click", toggleVideoStatus);

stopBtnEl.addEventListener("click", stopVideo);

progressEl.addEventListener("change", setVideoProgress);
