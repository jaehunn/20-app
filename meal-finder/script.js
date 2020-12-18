// @see https://www.themealdb.com/
const searchEl = document.getElementById("search");
const submitEl = document.getElementById("submit");
const randomBtnEl = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeadingEl = document.getElementById("result-heading");
const singleMealEl = document.getElementById("single-meal");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = "";

  // Get search term
  const searchTerm = searchEl.value;

  // Check for empty
  if (!searchTerm.trim()) return alert("Please enter a search term");

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((res) => res.json())
    .then((data) => {
      resultHeadingEl.innerHTML = `<h2>Search results for '${searchTerm}' :)</h2>`;

      if (data.meals === null)
        resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
      else
        mealsEl.innerHTML = data.meals
          .map(
            (meal) => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
          </div>`
          )
          .join("");
    });

  // Clear search text
  searchEl.value = "";
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    if (!meal[`strIngredient${i}`]) break;

    ingredients.push(
      `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
    );
  }

  singleMealEl.innerHTML = `
      <h1>${meal.strMeal}</h1>  
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        ${meal.strInstruction ? `<p>${meal.strInstruction}</p>` : ""}
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
      </div>
  `;
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = "";
  resultHeadingEl.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => addMealToDOM(data.meals[0]));
}

// Fetch meal by ID
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => addMealToDOM(data.meals[0]));
}

// Event listeners
submitEl.addEventListener("submit", searchMeal);
randomBtnEl.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find(
    (item) => item.classList && item.classList.contains("meal-info")
  );

  if (!mealInfo) return;

  const mealId = mealInfo.getAttribute("data-mealid");

  getMealById(mealId);
});
