const mongoose = require("mongoose");

const smoothieSchema = new mongoose.Schema({
    name: {
      type: String
    },

    image: {
      type: String
    },

    alt: {
        type: String
    },

    price: {
        type: mongoose.Decimal128
    },

    calories: {
        type: Number
    },

    ingredients: {
        type: String
    },

    quantity: {
        type: Number
    },

    category: {
        type: String
    },

  });

  module.exports = smoothieSchema
// module.exports = mongoose.model("Smoothie", smoothieSchema);