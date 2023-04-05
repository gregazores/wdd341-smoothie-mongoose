const express = require('express');
const router = express.Router();
const swaggerRouter = require('./swagger');
const cors = require('cors')
const session = require('express-session');
const passport = require("passport");
//importing passport here
require("../library/auth")

//router.use(cors())
router.use('/public', express.static('public'))

//router for swagger
router.use('/', swaggerRouter);

//sessions secrets, session and passport initialize
router.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false,
  cookie: {
    //sameSite needs to be set to none to allow exchanging of cookies cross origin.
    sameSite: "none",
    //so it will work with http and https
    secure: false
  } 
}));

router.use(passport.initialize());
router.use(passport.session());

//router for user requests
router.use('/users', require('./users'))

//router for balanced fusions requests
router.use('/balanced-fusions', require('./balancedFusions'))
//router for fruit blend requests
router.use('/fruit-blend', require('./fruitBlend'))
// //router for super veggies requests
router.use('/super-veggies', require('./superVeggies'))
// //router for checkout requests
router.use('/checkout', require('./checkout'))

router.get('/', (req, res, next) => {
  res.send('CSE 341 SMOOTHIEXPRESS API')
});

router.get("/root-protected", function(req, res){
  if (req.isAuthenticated()){
    res.send("This request is authenticated");
  } else {
    res.status(400).json("Sorry you must be logged in! No authorization");
  }
});

module.exports = router;










//this is destroying session fails everytime
//   router.get/*or post*/("/logout", function(req, res, next) {
//     if (req.user) {
//         req.logout(function(err) {
//             if (err) { return next(err); }
//             res.send("successfully logged out");
//           });
//     }

//     if (req.session) {
//         req.session.destroy(function (err) {
//           if (err) {
//             console.log(err)
//           }
//           console.log("Destroyed the user session on Auth0 endpoint");
//           res.redirect('https://<myapp>.auth0.com/v2/logout?client_id=<clientId>&returnTo=http://localhost:3000/');
//         });
//       }

//   });

// router.get('/logout', (req, res) => {
//     req.logout();
//     if (req.session) {
//       req.session.destroy(function (err) {
//         if (err) {
//           console.log(err)
//         }
//         console.log("Destroyed the user session on Auth0 endpoint");
//         res.redirect('https://<myapp>.auth0.com/v2/logout?client_id=<clientId>&returnTo=http://localhost:3000/');
//       });
//     }
//   });