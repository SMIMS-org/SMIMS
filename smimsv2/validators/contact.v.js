const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateContactInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.sender = !isEmpty(data.sender) ? data.sender : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.body = !isEmpty(data.body) ? data.body : "";

  if (Validator.isEmpty(data.sender)) {
    errors.sender = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Subject field is required";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "Message body field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
