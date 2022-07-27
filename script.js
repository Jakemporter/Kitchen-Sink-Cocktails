// search by ingredient fetch
//todo clear results before displaying again because I'm getting an error

// to do: .push? to create a list of the drinks in display not just the last one
var apiKey = keys.API_KEY;

var searchInput;

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var ingredientInputVal = $("#ingredient-input").val();
  var nameInputVal = $("#cocktail-search").val();

  if (!ingredientInputVal && !nameInputVal) {
    console.error("You need a search input value!");
    return;
  }
  if (ingredientInputVal) {
    searchInput = ingredientInputVal;
  } else if (nameInputVal) {
    searchInput = nameInputVal;
  }

  console.log(searchInput);
  // location.assign(ingredientSearchInput);
}

function ingredientSearch() {
  var apiCall =
    "https://cors-anywhere.herokuapp.com/www.thecocktaildb.com/api/json/v2/" + apiKey + "/filter.php?i=" + searchInput;
  console.log(apiCall);
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.drinks);

      // for (let index = 0; index < data.drinks.length; index++) {
      //     // const drinks = data.drinks[index];
      //     }

      $("#recipe-display").text(
        "Ingredient search result: " +
          data.drinks[0]["strDrink"] +
          " " +
          data.drinks[0]["strDrinkThumb"] +
          " " +
          data.drinks[0]["strInstructions"]
      );
    });
}

// search by name function
function nameSearch() {
  var apiCall =
    "https://cors-anywhere.herokuapp.com/http://www.thecocktaildb.com/api/json/v2/" +
    apiKey +
    "/search.php?s=" +
    searchInput;
  console.log(apiCall);
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.drinks);

      // for (let index = 0; index < data.drinks.length; index++) {
      //     // const drinks = data.drinks[index];
      //     }

      $("#recipe-display").text(
        "Ingredient search result: " +
          data.drinks[0]["strDrink"] +
          " " +
          data.drinks[0]["strDrinkThumb"] +
          " " +
          data.drinks[0]["strInstructions"]
      );
    });
}
$(".ingredient-search").on("click", handleSearchFormSubmit);
$("#ingredient-search").on("click", ingredientSearch);

$(".name-search").on("click", handleSearchFormSubmit);
$("#name-search").on("click", nameSearch);
