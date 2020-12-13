const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRoomInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.room_number = !isEmpty(data.room_number) ? data.room_number : "";
  data.size = !isEmpty(data.size) ? data.size : "";
  data.room_type = !isEmpty(data.room_type) ? data.room_type : "";

  // Password checks
  if (Validator.isEmpty(data.room_number + "")) {
    errors.room_number = "Room Number field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.size + "")) {
    errors.size = "Size field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.room_type)) {
    errors.room_type = "Room Type field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
