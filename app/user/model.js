const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

let userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be filled"],
      maxLength: [255, "Username length must be between 3 and 255 characters"],
      minLength: [3, "Username length must be between 3 and 255 characters"],
    },
    customer_id: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Email must be filled"],
      maxLength: [255, "Email length must not exceed 255 characters"],
    },
    password: {
      type: String,
      required: [true, "Password must be filled"],
      maxLength: [255, "Password length must not exceed 255 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    token: [String],
  },
  { timestamps: true }
);

userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} must be a valid email!`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} is already registered`
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);
