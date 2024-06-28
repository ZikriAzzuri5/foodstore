const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const cartItemSchema = Schema(
  {
    name: {
      type: String,
      minLength: [5, "Product name must be at least 5 characters long"],
      required: [true, "Product name must be filled"],
    },
    qty: {
      type: Number,
      required: [true, "Quantity must be filled"],
      min: [1, "Minimum quantity is 1"],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = model("CartItem", cartItemSchema);
