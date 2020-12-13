const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateMessageInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.receiver = !isEmpty(data.receiver) ? data.receiver : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.body = !isEmpty(data.body) ? data.body : "";

  if (Validator.isEmpty(data.receiver)) {
    errors.receiver = "Message To field is required";
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
