const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contractSchema = new Schema(
  {
    tenant_id: {
      type: String,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    room_number: {
      type: String,
      required: true,
    },
    valid_from: {
      type: Date,
      required: true,
    },
    valid_until: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    advance: {
      type: Number,
      required: true,
    },
    // advance_void: {
    //   type: Boolean,
    //   default: false,
    // },
    date: {
      type: Date,
      default: Date.now,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contract = mongoose.model("contracts", contractSchema);

module.exports = Contract;
