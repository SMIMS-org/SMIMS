const router = require("express").Router();

const validateExpenseInput = require("../validators/expense.v");

let Expense = require("../models/expense.model");

router.get("/getAll", (req, res) => {
  Expense.find({}).then((expenses) => {
    if (!expenses) {
      return res.status(404).json({ expensesnotfound: "Expenses not found" });
    }
    return res.status(200).json(expenses);
  });
});

// Delete an expense
router.delete("/delete/:id", (req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then((expense) => res.status(200).json(expense))
    .catch((err) => res.status(400).json(err));
});

// Update an expense
router.put("/update/:id", (req, res) => {
  const { errors, isValid } = validateExpenseInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((expense) => res.status(200).json(expense))
    .catch((err) => res.status(400).json(err));
});

router.post("/add", (req, res) => {
  const { errors, isValid } = validateExpenseInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newExpense = new Expense({
    expense_type: req.body.expense_type,
    paid_date: req.body.paid_date,
    paid_amount: req.body.paid_amount,
  });
  newExpense
    .save()
    .then((expense) => res.json(expense))
    .catch((err) => console.log(err));
});

module.exports = router;
