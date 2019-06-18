
//load bcrypt
var bCrypt = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function (passport, user) {

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  // passport session setup
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session    
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });


  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });

  });
  // LOCAL SIGNUP ============================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy(
    // by default, local strategy uses username and password, we will override with email

    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function (req, email, password, done) {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists  

      var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({ where: { email: email } }).then(function (user) {

        if (user) {
          return done(null, false, { message: 'That email is already taken' });
        }

        else {
          // if there is no user with that email
          // create the user
          var userPassword = generateHash(password);
          var data =
          {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname
          };


          User.create(data).then(function (newUser, created) {
            if (!newUser) {
              return done(null, false);
            }

            if (newUser) {
              return done(null, newUser);

            }


          });
        }


      });



    }



  ));

  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(

    {

      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function (req, email, password, done) {

      var User = user;

      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }

      User.findOne({ where: { email: email } }).then(function (user) {

        if (!user) {
          return done(null, false, { message: 'Email does not exist' });
        }

        if (!isValidPassword(user.password, password)) {

          return done(null, false, { message: 'Incorrect password.' });

        }

        var userinfo = user.get();

        return done(null, userinfo);

      }).catch(function (err) {

        console.log("Error:", err);

        return done(null, false, { message: 'Something went wrong with your Signin' });


      });

    }
  ));

}

