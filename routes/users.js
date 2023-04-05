const express = require('express');
const router = express.Router();
const User1 = require('../model/user-model')
const { UserController } = require('../controller/index');
const passport = require("passport");
//importing passport here

//google auth router
//run the passport authentication google strategy
//and put the scope to profile
router.get("/auth/google",
  //profile is just the basic profile info according to google
  passport.authenticate('google', { scope: ["profile"], prompt: 'select_account' })
  //this will run our google authentication strategy
);

//this is going to be called on a successfull authentication or maybe called on a response to an application
// The following route will authenticate a user using a google strategy. 
// If successfully verified, Passport will call the serializeUser function
router.get("/auth/google/callback",
  passport.authenticate('google', { 
        successRedirect: "/users/success" ,
        failureRedirect: "/users/login-failed" 
  })
  
  );

router.get('/success', (req, res, next) => {
    res.status(200).json("Successfully logged in");
});

router.get('/login-failed', (req, res, next) => {
    res.status(500).json('Sorry failed to log in logged in');
});

router.get("/logout", function(req, res, next) {
    if (req.user) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.status(200).json("Successfully logged out!");
          });
    }
  });


router.get("/protected", function(req, res){
  if (req.isAuthenticated()){
    res.send("This request is authenticated");
  } else {
    res.status(400).json("Sorry you must be logged in! No authorization");
  }
});

router.post("/register", function(req, res){

  User1.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      res.status(400).json({message: err.message})
    } else {
      passport.authenticate("local")(req, res, function(){
        res.status(200).json("Successfully registered!");
      });
    }
  });

});

router.post("/login", function(req, res){

    const user = new User1({
      username: req.body.username,
      password: req.body.password
    });

    console.log(user)
  
req.login(user, function(err){
    if (err) {
    res.status(400).json({message: err.message})
    } else {
    passport.authenticate("local")(req, res, function(){
        res.status(200).json(req.session.cookie);
    });
    }
});

});

module.exports = router;