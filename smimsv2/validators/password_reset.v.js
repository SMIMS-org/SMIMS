const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePasswordResetInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.cpassword = !isEmpty(data.cpassword) ? data.cpassword : "";

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.cpassword)) {
    errors.cpassword = "Confirm Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.cpassword)) {
    errors.cpassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
