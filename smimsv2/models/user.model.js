const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tin: { type: Number },
    comp_name: { type: String },
    phone_no: { type: Number, required: true },
    address: { type: String, required: true },
    user_type: {
      type: String,
      required: true,
    },
    confirm: {
      type: Boolean,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
