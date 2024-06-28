const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const addressSchema = Schema(
  {
    name: {
      type: String,
      maxLength: [255, "Name length must not exceed 255 characters"],
      required: [true, "Address Name must be filled"],
    },
    ward: {
      type: String,
      maxLength: [255, "Ward length must not exceed 255 characters"],
      required: [true, "Ward Name must be filled"],
    },
    subdistrict: {
      type: String,
      maxLength: [255, "Subdistrict length must not exceed 255 characters"],
      required: [true, "Subdistrict Name must be filled"],
    },
    regency: {
      type: String,
      maxLength: [255, "Regency length must not exceed 255 characters"],
      required: [true, "Regency Name must be filled"],
    },
    province: {
      type: String,
      maxLength: [255, "Province length must not exceed 255 characters"],
      required: [true, "Province Name must be filled"],
    },
    detail: {
      type: String,
      maxLength: [1000, "Detail length must not exceed 1000 characters"],
      required: [true, "Detail Address must be filled"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Address", addressSchema);
