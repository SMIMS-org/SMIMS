const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  room_number: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  occopied: {
    type: Boolean,
    default: false,
  },
  tenant: {
    type: String,
  },
  price: {
    type: Number,
  },
}, {
  timestamps: true
});

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;