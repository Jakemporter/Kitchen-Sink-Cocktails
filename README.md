# Kitchen Sink Cocktails
To obtain information in order to make Cocktails with ingredients that are available to you, and to be able to find the ingredients of your favorite cocktails by name.
No installations are required. Through HTML, CSS, and JavaScript the site works in harmony to provide a list of a variety of cocktails and ingredients.

## Technical
- The function handleSearchFormSubmit is used to process data input from the ingredient search and cocktail name search fields. If the value returns data from the API call, the data is displayed in the recipe-display div. If the values do not return a search result, a message will display to prompt the user to try a different search.
- A free, open-source API from "thecocktaildb" was used to create fetch API functions to retreive data from thecocktaildb.com, while passing in variables from the search input fields.
- For-loops are used to append each result to the recipe display div.
- To retreive a Quote of the Day for the website, a fetch function is called to FavQs.com. The results are displayed in the quote of the day div.
