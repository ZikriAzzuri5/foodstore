const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const autoIncrement = require("mongoose-sequence")(mongoose);
const invoice = require("../invoice/model");

const orderSchema = Schema(
  {
    status: {
      type: String,
      enum: ["waiting_payment", "processing", "in_delivery", "delivered"],
      default: "waiting_payment",
    },
    delivery_fee: {
      type: Number,
      default: 0,
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItem: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
  },
  { timestamps: true }
);

orderSchema.plugin(autoIncrement, { inc_field: "order_number" });
orderSchema.virtual("items_count").get(function () {
  return this.order_items.reduce(
    (total, item) => total + parseInt(item.qty),
    0
  );
});
orderSchema.post("save", async function () {
  let sub_total = this.order_items.reduce(
    (total, item) => (total += item.price * item.qty),
    0
  );
  let invoice = new Invoice({
    user: this.user,
    order: this._id,
    sub_total: sub_total,
    delivery_fee: parseInt(this.delivery_fee),
    total: parseInt(sub_total + this.delivery_fee),
    address: this.address,
  });
  await invoice.save();
});

module.exports = model("Order", orderSchema);
