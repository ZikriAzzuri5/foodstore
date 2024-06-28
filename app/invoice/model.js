const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const invoiceSchema = Schema(
  {
    sub_total: {
      type: Number,
      required: [true, "Sub Total must be filled"],
    },
    delivery_fee: {
      type: Number,
      required: [true, "Delivery Fee must be filled"],
    },
    address: {
      province: { type: String, required: [true, "Province must be filled"] },
      regency: { type: String, required: [true, "Regency must be filled"] },
      subdistrict: {
        type: String,
        required: [true, "Subdistrict must be filled"],
      },
      ward: { type: String, required: [true, "Ward must be filled"] },
      detail: { type: String },
    },
    total: {
      type: Number,
      required: [true, "Total must be filled"],
    },
    payment_status: {
      type: String,
      enum: ["waiting_payment", "paid"],
      default: "waiting_payment",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

module.exports = model("Invoice", invoiceSchema);
