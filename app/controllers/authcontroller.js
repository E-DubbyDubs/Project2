var exports = module.exports = {}
var path       = require("path");

exports.signup = function(req,res){

	res.render('signup'); 

}

exports.signin = function(req,res){

	res.render('signin'); 

}

exports.dashboard = function(req,res){

  // res.render('dashboard');
  console.log(__dirname);
  res.sendFile(path.join(__dirname,"..","/app/public/views/dashboard.html"));
}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/');
  });

}