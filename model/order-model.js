const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    fname: {
      type: String
    },

    user: {
        type: String
      },

    phone: {
      type: String
    },

    email: {
        type: String
    },

    ccnum: {
        type: Number
    },

    expdate: {
        type: String
    },

    code: {
        type: Number
    },

    orderDate: {
        type: Date
    },

    orderTotal: {
        type: Number
    },

    tax: {
        type: Number
    },

    shipping: {
        type: Number
    },

    items: {
        type: Array
    },

  });

  module.exports = orderSchema
// module.exports = mongoose.model("Smoothie", smoothieSchema);