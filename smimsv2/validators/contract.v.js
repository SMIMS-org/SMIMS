const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateContractInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.tenant = !isEmpty(data.tenant) ? data.tenant : "";
  data.room_number = !isEmpty(data.room_number) ? data.room_number : "";
  data.valid_from = !isEmpty(data.valid_from) ? data.valid_from : "";
  data.valid_until = !isEmpty(data.valid_until) ? data.valid_until : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.advance = !isEmpty(data.advance) ? data.advance : "";

  // Password checks
  if (Validator.isEmpty(data.tenant)) {
    errors.tenant = "Tenant field is required";
  }

  // Password checks
  if (Validator.isEmpty(data.room_number + "")) {
    errors.room_number = "Room Number field is required";
  }
  // Valid From checks
  if (Validator.isEmpty(data.valid_from)) {
    errors.valid_from = "Valid From field is required";
  }
  // Valid Until checks
  if (Validator.isEmpty(data.valid_until)) {
    errors.valid_until = "Valid Until field is required";
  }
  // Price checks
  if (Validator.isEmpty(data.price + "")) {
    errors.price = "Price Per Month field is required";
  }
  // Advacne checks
  if (Validator.isEmpty(data.advance + "")) {
    errors.advance = "Paid in Advance field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
