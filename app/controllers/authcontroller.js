var exports = module.exports = {}
var path = require("path");
var express = require('express');
var app = express();
app.use(express.static('public'));

exports.signup = function (req, res) {

  res.render('signup');

}

exports.signin = function (req, res) {

  res.render('signin');

}

exports.dashboard = function (req, res) {

  // res.render('dashboard');
  // console.log(__dirname);
  // res.sendFile(path.join(__dirname,"..","/public/views/dashboard.html"));
  // res.sendFile(path.join(__dirname,"..","/public/css/style.css"));
  res.render("index", {
    msg: "YUMMY RECIPES",
    img: "public/images/recipe.png"
  });
}

exports.logout = function (req, res) {

  req.session.destroy(function (err) {
    res.redirect('/');
  });

}