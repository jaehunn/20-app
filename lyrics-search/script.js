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
  resultEl.innerHTML =
    data.data.reduce((result, song) => {
      result += `
        <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>
      `;

      return result;
    }, '<ul class="songs">') + "</ul>";

  moreEl.innerHTML =
    data.prev || data.next
      ? `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ""
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
        `
      : "";
}

// Get prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); // CORS Issue
  const data = await res.json();

  showData(data);
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  resultEl.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}<h2>
        <span>${lyrics}</span>
    `;

  moreEl.innerHTML = "";
}

// Event listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = searchEl.value;

  !searchValue
    ? alert("Please type in a search term")
    : searchSongs(searchValue);
});

// Get lyrics button click
resultEl.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
