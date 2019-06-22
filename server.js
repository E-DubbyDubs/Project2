var express    = require('express');
var app        = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env        = require('dotenv').load();
var exphbs     = require('express-handlebars');
var path       = require("path");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(__dirname + '/app/public'));
app.use(express.static(path.join(__dirname, '/app/public')));

 // For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

 //For Handlebars
// app.set('views', './app/views')
// app.engine('hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');

app.set('views', './app/public/views')
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");


// app.get('/', function(req, res){
//   res.send('Welcome to Passport with Sequelize');
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/app/public/views/view.html'));
  });

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

//load passport strategies
require('./app/config/passport/passport.js')(passport,models.user);

//Sync Database
   models.sequelize.sync().then(function(){
console.log('Nice! Database looks fine')

}).catch(function(err){
console.log(err,"Something went wrong with the Database Update!")
});

app.listen(5000, function(err){
    if(!err)
    console.log("Site is live"); else console.log(err)

});    