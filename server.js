require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const path = require("path");
var models = require("./app/models");
//var path = require("path")
var db = require("./app/models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/views/view.html"));
});


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Routes
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


//Sync Database
models.sequelize.sync().then(function(){
  console.log("Nice! Database looks fine")

  }).catch(function(err){
  console.log(err,"Something went wrong with the Database Update!")
  });

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
