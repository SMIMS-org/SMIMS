const router = require("express").Router();

const validateContractInput = require("../validators/contract.v");

let Contract = require("../models/contract.model");

// Get All Contracts
router.get("/getAll", (req, res) => {
  // Find all rooms
  Contract.find({}).then((contracts) => {
    if (!contracts) {
      return res.status(404).json({ contractnotfound: "Contract not found" });
    }
    return res.status(200).json(contracts);
  });
});

// Get by tenant
router.get("/get/:tenant_id", (req, res) => {
  // Find all rooms
  Contract.find({ tenant_id: req.params.tenant_id }).then((contracts) => {
    if (!contracts) {
      return res.status(404).json({ contractnotfound: "Contract not found" });
    }
    return res.status(200).json(contracts);
  });
});

// Get all unnotified
router.get("/getAllUnnotified", (req, res) => {
  // Find all rooms
  Contract.find({ notified: false }).then((contracts) => {
    if (!contracts) {
      return res.status(404).json({ contractnotfound: "Contract not found" });
    }
    return res.status(200).json(contracts);
  });
});

router.put("/notified/:id", (req, res) => {
  Contract.findByIdAndUpdate(req.params.id, { notified: true }, { new: true })
    .then((contract) => res.status(200).json(contract))
    .catch((err) => res.status(400).json(err));
});

// Delete a contract
router.delete("/delete/:id", (req, res) => {
  Contract.findByIdAndDelete(req.params.id)
    .then((contract) => res.status(200).json(contract))
    .catch((err) => res.status(400).json(err));
});

// Delete all contract by tenant
router.delete("/deleteAll/:tenant", (req, res) => {
  Contract.deleteMany({ tenant: req.params.tenant })
    .then((contracts) => res.status(200).json(contracts))
    .catch((err) => res.status(400).json(err));
});

// Delete all contract by room_number
router.delete("/deleteAll/:room_number", (req, res) => {
  Contract.deleteMany({ room_number: req.params.room_number })
    .then((contract) => res.status(200).json(contract))
    .catch((err) => res.status(400).json(err));
});

// Update a contract
router.put("/update/:id", (req, res) => {
  // Form validation
  const { errors, isValid } = validateContractInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Contract.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((contract) => res.status(200).json(contract))
    .catch((err) => res.status(400).json(err));
});

// Update a contract
router.put("/modify/:id", (req, res) => {
  Contract.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((contract) => res.status(200).json(contract))
    .catch((err) => res.status(400).json(err));
});

router.post("/add", (req, res) => {
  // Form validation
  const { errors, isValid } = validateContractInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newContract = new Contract({
    tenant_id: req.body.tenant_id,
    tenant: req.body.tenant,
    room_number: req.body.room_number,
    valid_from: req.body.valid_from,
    valid_until: req.body.valid_until,
    price: req.body.price,
    // advance: req.body.advance,
  });
  newContract
    .save()
    .then((contract) => res.json(contract))
    .catch((err) => console.log(err));
});

router.put("/update/:id", (req, res) => {
  id = req.params.id;

  Contract.findOne({ _id: id }).then((contract) => {
    if (!contract) {
      return res.status(404).json({ contractnotfound: "Contract not found" });
    }
    newContract = {
      tenant: req.body.tenant || contract.tenant,
      room_number: req.body.room_number || contract.room_number,
      valid_from: req.body.valid_from || contract.valid_from,
      valid_until: req.body.valid_until || contract.valid_until,
      price: req.body.price || contract.price,
      advance: req.body.advance || contract.advance,
      // advance_void:
      //   req.body.advance_void === null
      //     ? contract.advance_void
      //     : req.body.advance_void,
    };
    Contract.findOneAndUpdate(
      { _id: id },
      newContract,
      { upsert: true },
      (err, updatedContract) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json(updatedContract);
      }
    );
  });
});

module.exports = router;
