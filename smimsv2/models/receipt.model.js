const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const receiptSchema = new Schema(
  {
    tenant_id: {
      type: String,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    payment_start: {
      type: Date,
      required: true,
    },
    valid_until: {
      type: Date,
      required: true,
    },
    paid_month: {
      type: Number,
      required: true,
    },
    paid_amount: {
      type: Number,
      required: true,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Receipt = mongoose.model("receipts", receiptSchema);

module.exports = Receipt;
