const express = require('express')
const app = express()
const mongoose = require('./library/connection')
const router = require('./routes');
require("./library/auth")

app.set('trust proxy', 1) // trust first proxy

app.use(express.urlencoded({extended: false}))
//so we can use json data as well
app.use(express.json())

// app.use(session({
//   secret: "Our little secret.",
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', "https://quiet-maamoul-933004.netlify.app");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

app.use('/', router);


mongoose.initDb();
module.exports = app