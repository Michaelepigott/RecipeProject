module.exports = {

};
// utils/helpers.js

Handlebars.registerHelper('searchIngredients', function(ingredientName, searchTerm, options) {
    // Convert both the ingredientName and searchTerm to lowercase
    var lowercaseIngredientName = ingredientName.toLowerCase();
    var lowercaseSearchTerm = searchTerm.toLowerCase();
  
    // Create a new Fuse instance with the ingredient names as the data
    var fuse = new Fuse([lowercaseIngredientName], {
      includeScore: true,
      threshold: 0.4, // Adjust the threshold to control the fuzziness
    });
  
    // Perform the fuzzy search and get the results
    var searchResults = fuse.search(lowercaseSearchTerm);
  
    // Check if there is at least one match
    if (searchResults.length > 0) {
      // If there is a match, execute the code inside the block
      return options.fn(this);
    } else {
      // If there is no match, execute the code inside the else block (if provided)
      return options.inverse(this);
    }
  })


//   Make sure to include the utils/helpers.js file in your HTML file after including the Handlebars library, similar to the previous example.
