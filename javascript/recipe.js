


// Start The App
//Search for Recipes using Edemam API
 

var search;

$('#searchButton').on('click', function () {
  $('#results1').empty();
  $('#results1').text('Searching...');
  search = $('#seach_recipe').val().trim();


  if (search == '') {
    $('#results1').text('Please enter a recipe name.');

  }
  
//  var appId = "ebaa6049"
  //var appKey = "e4ab93601fb908ac4f17e5380ac68f64	"
 

  function displayRecipes() {
    $.ajax({ url: 'https://api.edamam.com/search?q=' + search + '&app_id=ebaa6049&app_key=e4ab93601fb908ac4f17e5380ac68f64'+'&from=0&to=6'
    }).then(function(response) {
      console.log(response)
       
    var intCalories = (response.hits[0].recipe.calories)/(response.hits[0].recipe.yield);
		var calories = (Math.floor(intCalories));
		var results = response.hits;

    $('#results1').html('');
    

		for (i = 0; i < results.length; i++) {
      var intCalories = (results[i].recipe.calories)/(results[i].recipe.yield)
      
      var calories = (Math.floor(intCalories));
      var ingredient = (results[i].recipe.ingredientLines);;
      var recipeDiv = $('<div>').width(150);
     
      var recipeImage = $('<img>');
      var recipeImage = $('<img>').width(80);
			var recipeCaption = $('<div>');
			var recipeBtnDiv = $('<div>');
			var caloriesP = $('<p>');
			recipeCaption.addClass('caption');
			recipeCaption.append($('<div>').text(results[i].recipe.label).addClass('recipeName'));
			recipeCaption.addClass('text-center');
			caloriesP.text(calories + ' calories per serving');
			recipeCaption.append(caloriesP)
			recipeBtnDiv.append($('<a>').append($('<button>').addClass('btn recipeBtn').text('Go to recipe')).attr('href',results[i].recipe.url).attr('target','_blank'));
      var activityBtn = $('<button>').addClass('glyphicon glyphicon-heart');
      var activityBtn = $('<button>').text('Ingredients List').addClass('ingr');
			recipeBtnDiv.append(activityBtn);
			recipeCaption.append(recipeBtnDiv);
			recipeImage.attr('src', results[i].recipe.image);
			recipeDiv.addClass('thumbnail col-md-4 recipe');
      recipeDiv.append(recipeImage);
      recipeDiv.append(recipeCaption);
      recipeDiv.append(recipeCaption);
       
			$('#results1').prepend(recipeDiv)
      console.log(ingredient);
      

     
    }
  
  })
}
  displayRecipes();
 
 
})
 
//display ingredient list


/* $('#recipe1').html('');
      var ingredient = (results[i].recipe.ingredientLines);
            
      var ingredientBtnDiv = $('<div>');
      var ingredientBtnDiv = $('<div>');
      ingredientBtnDiv.append(ingredient);
 */


