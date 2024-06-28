const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    minLength: [5, "Name must be at least 5 characters long"],
    required: [true, "Name must be filled"],
  },
  price: {
    type: Number,
    required: [true, "Price must be filled"],
  },
  qty: {
    type: Number,
    required: [true, "Quantity must be filled"],
    min: [1, "Quantity must be at least 1"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = model("OrderItem", orderItemSchema);
