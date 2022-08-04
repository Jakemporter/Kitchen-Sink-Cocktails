// to do add button to ingredient result

var ingredientInputVal = $("#ingredient-input").val();
var nameInputVal = $("#cocktail-search").val();

// search history
function searchHistory() {
  if (ingredientInputVal) {
    localStorage.setItem("searchHistory", JSON.stringify(ingredientInputVal));
  }
  else if (nameInputVal) {
    localStorage.setItem("searchHistory", JSON.stringify(nameInputVal));
  }
  if (localStorage.getItem("searchHistory")){
  $('#search-history').addClass('bigger');
  $('#search-history').text("Last search: " + localStorage.getItem("searchHistory"));
}
}



// search by ingredient fetch
var apiKey = keys.API_KEY;

var searchInput;

function quoteOfTheDay() {
  var apiCall = "https://favqs.com/api/qotd";
  console.log(apiCall);
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $(".quote").append(data.quote.body + " Author: " + data.quote.author);
      console.log(data);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  $("#recipe-display").text("");

  ingredientInputVal = $("#ingredient-input").val();
  nameInputVal = $("#cocktail-search").val();

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

  searchHistory();

  $("#ingredient-input").val("");
  $("#cocktail-search").val("");
}

function ingredientSearch() {
  var apiCall =
    " https://rocky-reef-56857.herokuapp.com/www.thecocktaildb.com/api/json/v2/" + apiKey + "/filter.php?i=" + searchInput;
  console.log(apiCall);
  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.drinks);

      // for loop to create list of results
      for (let i = 0; i < data.drinks.length; i++) {
        if (data.drinks != "None Found") {
          $("#recipe-display").append(`
        <div class="columns">
        <div class="column is-half is-offset-one-quarter">
        <div class="card">
        <div class="card-image">
        <figure class="image is-128x128">
        <img src="${data.drinks[i]["strDrinkThumb"]}" alt="Cocktail Thumbnail">
        </figure>
        </div>
        <div class="card-content">
        <div class="media">
        <div class="media-content">
        <p class="title is-4">${data.drinks[i]["strDrink"]}</p>
        
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`);
        } else {
          $("#recipe-display").addClass("bigger");
          $("#recipe-display").text("Ingredient not found. Please search a different ingredient.");
        }
      }
    });
}

// search by name function
function nameSearch() {
  var apiCall =
    " https://rocky-reef-56857.herokuapp.com/http://www.thecocktaildb.com/api/json/v2/" +
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


      if (data.drinks != null) {
        for (let i = 0; i < data.drinks.length; i++) {
          var i2 = 1
          var ingredients = [];
          var measures = [];
          while (data.drinks[i][`strIngredient${i2}`]) {
            ingredients.push(data.drinks[i][`strIngredient${i2}`])
            measures.push(data.drinks[i][`strMeasure${i2}`])
            i2++
            if (measures[0] && ingredients[0]) {
            var first = `${measures[0]} ${ingredients[0]}`
            }
            if (measures[1] && ingredients[1]) {
              var second = `${measures[1]} ${ingredients[1]}`
            }
            if (measures[2] && ingredients[2]) {
              var third = `${measures[2]} ${ingredients[2]}`
            }
            if (measures[3] && ingredients[3]) {
              var fourth = `${measures[3]} ${ingredients[3]}`
            }
            if (measures[4] && ingredients[4]) {
              var fifth = `${measures[4]} ${ingredients[4]}`
            }
            if (measures[5] && ingredients[5]) {
              var sixth = `${measures[5]} ${ingredients[5]}`
            }
            
          }
          console.log(ingredients);
          $("#recipe-display").append(`
        <div class="columns">
        <div class="column is-half is-offset-one-quarter">
        <div class="card">
        <div class="card-image">
        <figure class="image is-128x128">
        <img src="${data.drinks[i]["strDrinkThumb"]}" alt="Cocktail Thumbnail">
        </figure>
        </div>
        <div class="card-content">
        <div class="media">
        <div class="media-content">
        <p class="title is-4">${data.drinks[i]["strDrink"]}</p>
        
        </div>
        </div>
        
        <div class="content">
        
        ${first}
        <br>
        ${second}
        <br>
        ${third}
        <br>
        ${fourth}
        <br>
        ${fifth}
        <br>
        ${data.drinks[i]["strInstructions"]}
        
        </div>
        </div>
        </div>
        </div>
        </div>`);
        }
      } else {
        $("#recipe-display").addClass("bigger");
        $("#recipe-display").text("Drink not found. Please search a different drink.");
      }
    });
}

$(".ingredient-search").on("click", handleSearchFormSubmit);
$("#ingredient-search").on("click", ingredientSearch);

$(".name-search").on("click", handleSearchFormSubmit);
$("#name-search").on("click", nameSearch);

quoteOfTheDay();
searchHistory();