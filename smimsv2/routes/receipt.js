const router = require("express").Router();

const validateReceiptInput = require("../validators/receipt.v");

let Receipt = require("../models/receipt.model");

// Get all receipts
router.get("/getAll", (req, res) => {
  // Find all rooms
  Receipt.find({}).then((receipts) => {
    if (!receipts) {
      return res.status(404).json({ receiptnotfound: "Receipts not found" });
    }
    return res.status(200).json(receipts);
  });
});

// Get by tenant
router.get("/get/:tenant_name", (req, res) => {
  Receipt.find({ tenant: req.params.tenant_name }).then((receipts) => {
    if (!receipts) {
      return res.status(404).json({ receiptnotfound: "Receipts not found" });
    }
    return res.status(200).json(receipts);
  });
});

// Get all unnotified
router.get("/getAllUnnotified", (req, res) => {
  Receipt.find({ notified: false }).then((receipts) => {
    if (!receipts) {
      return res.status(404).json({ receiptnotfound: "Receipts not found" });
    }
    return res.status(200).json(receipts);
  });
});

router.put("/notified/:id", (req, res) => {
  Receipt.findByIdAndUpdate(req.params.id, { notified: true }, { new: true })
    .then((receipt) => res.status(200).json(receipt))
    .catch((err) => res.status(400).json(err));
});

// Delete a receipt
router.delete("/delete/:id", (req, res) => {
  Receipt.findByIdAndDelete(req.params.id)
    .then((receipt) => res.status(200).json(receipt))
    .catch((err) => res.status(400).json(err));
});

// Delete all receipt with id:id
router.delete("/deleteAll/:contract", (req, res) => {
  Receipt.deleteMany({ contract: req.params.contract })
    .then((receipt) => res.status(200).json(receipt))
    .catch((err) => res.status(400).json(err));
});

// Update a receipt
router.put("/update/:id", (req, res) => {
  const { errors, isValid } = validateReceiptInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((receipt) => res.status(200).json(receipt))
    .catch((err) => res.status(400).json(err));
});

router.post("/add", (req, res) => {
  // Form validation
  const { errors, isValid } = validateReceiptInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newReceipt = new Receipt({
    tenant_id: req.body.tenant_id,
    tenant: req.body.tenant,
    contract: req.body.contract,
    payment_start: req.body.payment_start,
    valid_until: req.body.valid_until,
    paid_month: req.body.paid_month,
    paid_amount: req.body.paid_amount,
  });
  newReceipt
    .save()
    .then((receipt) => res.json(receipt))
    .catch((err) => console.log(err));
});

module.exports = router;
