// search by ingredient fetch

// to do: event prevent default, .push? to create a list of the drinks in display not just the last one

var ingredientSearchInput;

function handleSearchFormSubmit(event) {
    event.preventDefault();


    var searchInputVal = $('#ingredient-input').val()
    console.log(searchInputVal);
    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    ingredientSearchInput = searchInputVal

    // location.assign(ingredientSearchInput);
}

function ingredientSearch() {
    var apiCall = 'https://cors-anywhere.herokuapp.com/http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredientSearchInput;
    console.log(apiCall);
    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.drinks)

            // for (let index = 0; index < data.drinks.length; index++) {
            //     // const drinks = data.drinks[index];
            //     }

            $('#recipe-display').text(data.drinks[0]["strDrink"])

        })

}

$('.ingredient-search').on('click', handleSearchFormSubmit);
$('#ingredient-search').on('click', ingredientSearch);
