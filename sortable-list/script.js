const draggableListEl = document.getElementById("draggable-list");
const checkEl = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

let dragStartIndex;

createList();

const numbers = [1, 3, 110, 40, 302];

// Insert list items into DOM
function createList() {
  draggableListEl.innerHTML =
    [...richestPeople]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .reduce(
        (listEl, { value: person }, index) =>
          (listEl += `<li data-index="${index}">
            <span class="number">${index + 1}</span>
            <div class="draggable" daggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        </li>`),
        `<ul class='draggable-list'>`
      ) + "</ul>";

  addEvents();
}

function addEvents() {
  const draggableEls = document.querySelectorAll(".draggable");
  const dragListItemEls = document.querySelectorAll(".draggable-list li");

  draggableEls.forEach((draggableEl) => {
    draggableEl.addEventListener("dragstart", dragStart);
  });

  dragListItemEls.forEach((dragListItemEl) => {
    dragListItemEl.addEventListener("dragover", dragOver);
    dragListItemEl.addEventListener("drop", dragDrop);
    dragListItemEl.addEventListener("dragenter", dragEnter);
    dragListItemEl.addEventListener("dragleave", dragLeave);
  });
}

checkEl.addEventListener("click", checkOrder);

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragLastIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragLastIndex);

  this.classList.remove("over");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const draggableEls = document.querySelectorAll(".draggable");
  const itemOneEl = draggableEls[fromIndex];
  const itemTwoEl = draggableEls[toIndex];

  // @see https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild
  document.querySelector(`[data-index="${fromIndex}"]`).appendChild(itemTwoEl);
  document.querySelector(`[data-index="${toIndex}"]`).appendChild(itemOneEl);
}

function checkOrder() {
  const dragListItemEls = document.querySelectorAll(".draggable-list li");

  dragListItemEls.forEach((listItemEl, index) => {
    const personNameEl = listItemEl
      .querySelector(".draggable")
      .innerText.trim();

    if (personNameEl !== richestPeople[index]) {
      listItemEl.classList.add("wrong");
    } else {
      listItemEl.classList.remove("wrong");
      listItemEl.classList.add("right");
    }
  });
}
