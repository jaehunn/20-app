const containerEl = document.querySelector(".container");
const seatEls = document.querySelectorAll(".row .seat:not(.occupied)");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const movieSelectEl = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelectEl.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeatEls = document.querySelectorAll(".row .seat.selected");

  const selectedSeatElsIndex = [...selectedSeatEls].map((selectedSeatEl) =>
    [...seatEls].indexOf(selectedSeatEl)
  );

  localStorage.setItem(
    "selectedSeatsIndices",
    JSON.stringify(selectedSeatElsIndex)
  );

  const selectedSeatElsCount = selectedSeatEls.length;

  countEl.innerText = selectedSeatElsCount;
  totalEl.innerText = selectedSeatElsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeatElsIndices = JSON.parse(
    localStorage.getItem("selectedSeatsIndices")
  );

  if (selectedSeatElsIndices !== null && selectedSeatElsIndices.length > 0) {
    seatEls.forEach((seatEl, index) => {
      if (~selectedSeatElsIndices.indexOf(index)) {
        seatEl.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelectEl.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelectEl.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});

// Seat click event
containerEl.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    console.log(e.target);
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
