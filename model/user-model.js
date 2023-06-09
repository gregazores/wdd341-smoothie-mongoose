const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    username: {
      type: String
    },

    email: {
      type: String
    },

    password: {
        type: String
    },

    googleId: {
        type: String
    },

  });

  userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

module.exports = mongoose.model("Users", userSchema);