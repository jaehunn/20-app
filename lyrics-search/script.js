// @see https://lyricsovh.docs.apiary.io
const apiUrl = "https://api.lyrics.ovh";

const formEl = document.getElementById("form");
const searchEl = document.getElementById("search");
const resultEl = document.getElementById("result");
const moreEl = document.getElementById("more");

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiUrl}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  // wip...
}

// Event listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = searchEl.value;

  !searchValue
    ? alert("Please type in a search term")
    : searchSongs(searchValue);
});
