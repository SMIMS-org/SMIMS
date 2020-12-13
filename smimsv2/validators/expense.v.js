const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateExpenseInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.expense_type = !isEmpty(data.expense_type) ? data.expense_type : "";
  data.paid_date = !isEmpty(data.paid_date) ? data.paid_date : "";
  data.paid_amount = !isEmpty(data.paid_amount) ? data.paid_amount : "";

  if (Validator.isEmpty(data.expense_type)) {
    errors.expense_type = "Expense Type field is required";
  }

  if (Validator.isEmpty(data.paid_date)) {
    errors.paid_date = "Paid Date From field is required";
  }

  if (Validator.isEmpty(data.paid_amount + "")) {
    errors.paid_amount = "Paid Amount field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
