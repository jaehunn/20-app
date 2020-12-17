// @see https://www.themealdb.com/

const searchBtnEl = document.getElementById("search");
const submitBtnEl = document.getElementById("submit");
const randomBtnEl = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeadingEl = document.getElementById("result-heading");
const singleMealEl = document.getElementsByTagName("single-meal");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = "";

  // Get search term
  const searchTerm = searchBtnEl.value;

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
  searchBtnEl.value = "";
}

// Event listeners
submitBtnEl.addEventListener("submit", searchMeal);
