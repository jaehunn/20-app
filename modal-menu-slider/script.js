const toggleBtnEl = document.getElementById("toggle");
const closeBtnEl = document.getElementById("close");
const openBtnEl = document.getElementById("open");
const modalEl = document.getElementById("modal");

// Toggle nav
toggleBtnEl.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

// Show modal
openBtnEl.addEventListener("click", () => modalEl.classList.add("show-modal"));

// Hide modal
closeBtnEl.addEventListener("click", () =>
  modalEl.classList.remove("show-modal")
);

// Hide modal on outside click
window.addEventListener("click", (e) =>
  e.target === modalEl ? modal.classList.remove("show-modal") : false
);
