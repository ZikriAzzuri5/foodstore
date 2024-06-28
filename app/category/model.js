const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [20, "Name must not exceed 20 characters"],
    required: [true, "Category name must be filled"],
  },
});

module.exports = model("Category", categorySchema);
