// search by ingredient fetch
var apiKey = keys.API_KEY;

var searchInput;

function handleSearchFormSubmit(event) {
    event.preventDefault();
    $('#recipe-display').text('')

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


    $('#ingredient-input').val('')
    $('#cocktail-search').val('')
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

            // for loop to create list of results
            for (let i = 0; i < data.drinks.length; i++) {
                if (data.drinks != "None Found") {
                    $('#recipe-display').append(data.drinks[i]['strDrink'] + ' ' + data.drinks[i]['strDrinkThumb']);
                    $('#recipe-display').addClass('recipes')
                }

                else {
                    $('#recipe-display').text("Ingredient not found. Please search a different ingredient.");
                }

            }

        });

};




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

            if (data.drinks != null) {
                for (let i = 0; i < data.drinks.length; i++) {

                    $('#recipe-display').append(`<div class="card" style="width: 18rem;">
                    <img src="${data.drinks[i]['strDrinkThumb']}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data.drinks[i]['strDrink']}</h5>
                      <p class="card-text">${data.drinks[i]["strInstructions"]}</p>
                  
                    </div>
                  </div>`);
                }
            }

            else {
                $('#recipe-display').text("Drink not found. Please search a different drink.");
            }
    });
}

$(".ingredient-search").on("click", handleSearchFormSubmit);
$("#ingredient-search").on("click", ingredientSearch);

$(".name-search").on("click", handleSearchFormSubmit);
$("#name-search").on("click", nameSearch);


