const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.tin = !isEmpty(data.tin) ? data.tin : "";
  data.comp_name = !isEmpty(data.comp_name) ? data.comp_name : "";
  data.phone_no = !isEmpty(data.phone_no) ? data.phone_no : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Tin checks
  if (Validator.isEmpty(data.tin + "")) {
    errors.tin = "Tin field is required";
  }
  // Comp Name checks
  if (Validator.isEmpty(data.comp_name)) {
    errors.comp_name = "Campany field is required";
  }
  // Phone Number checks
  if (Validator.isEmpty(data.phone_no + "")) {
    errors.phone_no = "Phone Number field is required";
  }
  // Tin checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }
  // User Type checks
  // if (Validator.isEmpty(data.user_type)) {
  //   errors.user_type = "User type field is required";
  // }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  //   if (!Validator.equals(data.password, data.password2)) {
  //     errors.password2 = "Passwords must match";
  //   }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
