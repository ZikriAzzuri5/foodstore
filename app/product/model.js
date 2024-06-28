const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
      required: [true, "Name must be filled"],
    },
    description: {
      type: String,
      maxLength: [1000, "Description must not exceed 1000 characters"],
    },
    price: {
      type: Number,
      default: 0,
    },

    image_url: String,

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    tags: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
