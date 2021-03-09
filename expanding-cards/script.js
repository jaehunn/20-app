const panelEls = document.querySelectorAll(".panel");

panelEls.forEach((panelEl) => {
  panelEl.addEventListener("click", () => {
    removeActiveClasses();

    panelEl.classList.add("active");
  });
});

function removeActiveClasses() {
  panelEls.forEach((panelEl) => {
    panelEl.classList.remove("active");
  });
}
