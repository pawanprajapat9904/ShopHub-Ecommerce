const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user: {
    type: String
  },

  products: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],

  totalPrice: Number,

  status: {
    type: String,
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);