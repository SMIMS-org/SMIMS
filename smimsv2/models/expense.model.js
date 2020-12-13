const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    expense_type: {
      type: String,
      required: true,
    },
    paid_date: {
      type: Date,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("expenses", expenseSchema);

module.exports = Expense;
