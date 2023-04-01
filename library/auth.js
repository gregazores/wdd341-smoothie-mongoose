const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User1 = require('../model/user-model')

// use static authenticate method of model in LocalStrategy
//passport.use(new LocalStrategy(User.authenticate()));
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User1.createStrategy());
//takes a user and a callback
//everytime a user is put into the session we need to serialize it
//serialize user is taking the entire user object we get frin the auth method make a cookie and storing it into a session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

//then deserialize user is taking the entire user object from the session and attaching it to the req.user object,
//which we can access.
//once authenticated and session is established,everytime we make a request we'll take the cookie from the request and deserialize it
passport.deserializeUser(async function(id, done) {
    let user = await User1.findById(id)
    done(null, user); 
  });

passport.use(new GoogleStrategy({
    // when there is a get request from http://localhost:3000/auth/google we run this google strategy
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: "http://localhost:3000/auth/google/secrets",
    callbackURL: "https://wdd341-smoothie-mongoose.onrender.com/users/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
//   function(accessToken, refreshToken, profile, cb) {
//         console.log(profile);

//         //from angela yu
//         User1.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//         });
//     }
    async function (accessToken, refreshToken, profile, done) {
        
        //upon successfull authentication, we enter here
        //insert into the database
        try {
            // Find or create user in your database
            let user = await User1.findOne({ googleId: profile.id });
            if (!user) {
                // Create new user in database
                // const username = Array.isArray(profile.emails) && profile.emails.length > 0 ? profile.emails[0].value.split('@')[0] : '';
                const newUser = new User1({
                    username: profile.displayName,
                    googleId: profile.id
                });
                user = await newUser.save();
            }
            return done(null, user);
            } catch (err) {
                return done(err);
            }
    }


));


