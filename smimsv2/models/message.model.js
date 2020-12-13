const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    receiver_name: {
      type: String,
      required: true,
    },
    visited: {
      type: Boolean,
      default: false,
    },
    manager_visited: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("messages", messageSchema);

module.exports = Expense;
