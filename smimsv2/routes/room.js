const router = require("express").Router();

const validateRoomInput = require("../validators/room.v");

let Room = require("../models/room.model");

// Get Rooms
router.get("/getAll", (req, res) => {
  // Find all rooms
  Room.find({}).then((rooms) => {
    if (!rooms) {
      return res.status(404).json({ roomnofound: "Room not found" });
    }
    return res.status(200).json(rooms);
  });
});

// Get Rooms
router.post("/add", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRoomInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // Find room by room number
  Room.findOne({ room_number: req.body.room_number }).then((room) => {
    // Check if room exists
    if (room) {
      return res.status(404).json({ room_number: "Room already exists" });
    } else {
      const newRoom = new Room({
        room_number: req.body.room_number,
        size: req.body.size,
        room_type: req.body.room_type,
      });
      newRoom
        .save()
        .then((room) => res.json(room))
        .catch((err) => console.log(err));
    }
  });
});

// Update a receipt
router.put("/update/:id", (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(400).json(err));
});

router.put("/modify/:id", (req, res) => {
  Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((room) => res.status(200).json(room))
    .catch((err) => res.status(400).json(err));
});

// router.put("/update/:id", (req, res) => {
//   id = req.params.id;

//   // Form validation
//   const { errors, isValid } = validateRoomInput(req.body);
//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   Room.findOne({ _id: id }).then((room) => {
//     if (!room) {
//       return res.status(404).json({ roomnotfound: "Room not found" });
//     }
//     newRoom = {
//       tenant: req.body.tenant || room.tenant,
//       room_number: req.body.room_number || room.room_number,
//       size: req.body.size || room.size,
//       room_type: req.body.room_type || room.room_type,
//       occopied: req.body.occopied === null ? room.occopied : req.body.occopied,
//     };
//     Room.findOneAndUpdate(
//       { _id: id },
//       newRoom,
//       { upsert: true },
//       (err, updatedRoom) => {
//         if (err) return res.status(500).json({ error: err });
//         return res.status(200).json(updatedRoom);
//       }
//     );
//   });
// });

module.exports = router;
