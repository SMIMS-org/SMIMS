const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateReceiptInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.contract = !isEmpty(data.contract) ? data.contract : "";
  data.payment_start = !isEmpty(data.payment_start) ? data.payment_start : "";
  data.valid_until = !isEmpty(data.valid_until) ? data.valid_until : "";
  data.paid_month = !isEmpty(data.paid_month) ? data.paid_month : "";
  data.paid_amount = !isEmpty(data.paid_amount) ? data.paid_amount : "";

  if (Validator.isEmpty(data.contract)) {
    errors.contract = "Contract field is required";
  }

  if (Validator.isEmpty(data.payment_start)) {
    errors.payment_start = "Payment Start From field is required";
  }

  if (Validator.isEmpty(data.valid_until)) {
    errors.valid_until = "Valid Until field is required";
  }

  if (Validator.isEmpty(data.paid_month + "")) {
    errors.paid_month = "Paid Month field is required";
  }

  if (Validator.isEmpty(data.paid_amount + "")) {
    errors.paid_amount = "Paid Amount field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
