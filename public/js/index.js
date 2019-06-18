 
// Get references to page elements
var $exampleIngredient = $("#example-ingredient");
var $exampleRecipe = $("#example-recipe");
var $exampleAuthor = $("#example-author");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
 


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

var searchIngredient = function() {

  
  
var ingredient = $("#ingr-input");
 
var appId = "fedaa58c"
var appKey = "cc278fb637c51da2bed120d07522a08f"
var queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=fedaa58c" + appId + "&app_key=cc278fb637c51da2bed120d07522a08f" + appKey + "&from=0&to=12";
$.ajax({
 url: queryURL,
 method: 'GET'
}).then(function(response) {
 console.log(response)
});
}

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.ingredient)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    ingredient: $exampleIngredient.val().trim(),
    recipe: $exampleRecipe.val().trim(),
    author: $exampleAuthor.val().trim()
  };

  if (!(example.ingredient && example.recipe)) {
    alert("You must enter an ingredient and link it to a recipe");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleIngredient.val("");
  $exampleRecipe.val("");
  $exampleAuthor.val("");
 
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
searchIngredient(this.ingredient);
