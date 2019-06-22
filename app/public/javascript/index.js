// Get references to page elements
var $exampleRecipe = $("#example-recipe");
var $exampleIngredient = $("#example-ingredient");
var $exampleDescription = $("#example-description");
var $exampleAuthor = $("#example-author");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.recipeName)
        .attr("href", "/example/" + example.id);
      
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      //delete ingredient
      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  console.log("event: " + event);
  event.preventDefault();

  var example = {
    recipeName: $exampleRecipe.val().trim(),
    ingredientList: $exampleIngredient.val().trim(),
    description: $exampleDescription.val().trim(),
    author: $exampleAuthor.val().trim()
  };

  // if (!(example.recipeName && example.author)) {
  //   alert("You must enter a Recipe and Author!");
  //   return;
  // }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleRecipe.val("");
  $exampleIngredient.val("");
  $exampleDescription.val("");
  $exampleAuthor.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

//Search for Recipes using Edemam API

var search;

$("#searchButtonOne").on("click", function () {
  $("#results1").empty();
  $("#results1").text("Searching...");
  search = $("#seach_recipe")
    .val()
    .trim();

  if (search == "") {
    $("#results1").text("Please enter a recipe name.");
  }

  //  var appId = "ebaa6049"
  //var appKey = "e4ab93601fb908ac4f17e5380ac68f64	"

  function displayRecipes() {
    $.ajax({
      url:
        "https://api.edamam.com/search?q=" +
        search +
        "&app_id=ebaa6049&app_key=e4ab93601fb908ac4f17e5380ac68f64" +
        "&from=0&to=6"
    }).then(function (response) {
      console.log(response);

      var intCalories =
        response.hits[0].recipe.calories / response.hits[0].recipe.yield;
      var calories = Math.floor(intCalories);
      var results = response.hits;

      $("#results1").html("");
      $("#ingredient1").html("");
      // $('#recipeName').html('');

      for (i = 0; i < results.length; i++) {
        var intCalories = results[i].recipe.calories / results[i].recipe.yield;

        var calories = Math.floor(intCalories);
        var ingredient = results[i].recipe.ingredientLines;
        var recipeDiv = $("<div>");

        var recipeImage = $("<img>");
        var recipeImage = $("<img>");
        var recipeCaption = $("<div>");
        var recipeBtnDiv = $("<div>");
        var activityBtn = $("<div>");
        activityBtn.addClass("text-center");
        var caloriesP = $("<p>");
        recipeCaption.addClass("caption");
        recipeCaption.append(
          $("<div>")
            .text(results[i].recipe.label)
            .addClass("recipeName")
        );
        recipeCaption.addClass("text-center");
        caloriesP.text(calories + " calories per serving");
        recipeCaption.append(caloriesP);
        recipeBtnDiv.append(
          $("<a>")
            .append(
              $("<button>")
                .addClass("btn recipeBtn")
                .text("Go to recipe")
            )
            .attr("href", results[i].recipe.url)
            .attr("target", "_blank")
        );
        activityBtn
          .append(
            $("<a>")
              .append(
                $("<button>")
                  .addClass("btn")
                  .text("Ingredients")
              )
              .text(results[i].recipe.label)
              .addClass("recipeName")
          )
          .attr("href", results[i].recipe.shareAs)
          .attr("target", "_blank");
        activityBtn.append(
          $("<a>")
            .append(
              $("<button>")
                .addClass("btn")
                .text("Ingredients")
            )
            .attr("href", results[i].recipe.shareAs)
            .attr("target", "_blank")
        );

        recipeBtnDiv.append(activityBtn);
        recipeCaption.append(recipeBtnDiv);
        recipeImage.attr("src", results[i].recipe.image);
        recipeDiv.addClass("thumbnail recipe");
        recipeDiv.append(recipeImage);
        recipeDiv.append(recipeCaption);
        recipeDiv.append(recipeCaption);

        $("#results1").append(recipeDiv);
        $("#ingredient1").append(activityBtn);

        //console.log(ingredient);
      }
    });
  }
  displayRecipes();
});

refreshExamples();
