const router = require("express").Router();

const validateMessageInput = require("../validators/message.v");
const validateContactInput = require("../validators/contact.v");

let Message = require("../models/message.model");

router.get("/getAll", (req, res) => {
  // Message.find({}).then((messages) => {
  //   if (!messages) {
  //     return res.status(404).json({ messagenofound: "Messages not found" });
  //   }
  //   return res.status(200).json(messages);
  // });

  Message.find({})
    .sort({ createdAt: -1 })
    .exec((err, messages) => {
      if (!messages) {
        return res.status(404).json({ messagenofound: "Messages not found" });
      }
      return res.status(200).json(messages);
    });
});

router.get("/get/:id", (req, res) => {
  // Message.find({ receiver: req.params.id }).then((messages) => {
  //   if (!messages) {
  //     return res.status(404).json({ messagenofound: "Messages not found" });
  //   }
  //   return res.status(200).json(messages);
  // });

  Message.find({ receiver: req.params.id })
    .sort({ createdAt: -1 })
    .exec((err, messages) => {
      if (!messages) {
        return res.status(404).json({ messagenofound: "Messages not found" });
      }
      return res.status(200).json(messages);
    });
});

router.post("/add", (req, res) => {
  // Form validation
  const { errors, isValid } = validateMessageInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newMessage = new Message({
    sender: req.body.sender,
    subject: req.body.subject,
    body: req.body.body,
    receiver: req.body.receiver,
    receiver_name: req.body.receiver_name,
  });
  newMessage
    .save()
    .then((message) => res.json(message))
    .catch((err) => console.log(err));
});

router.post("/contact", (req, res) => {
  // Form validation
  const { errors, isValid } = validateContactInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newMessage = new Message({
    sender: req.body.sender,
    subject: req.body.subject,
    body: req.body.body,
    receiver: req.body.receiver,
    receiver_name: req.body.receiver_name,
    email: req.body.email,
  });
  newMessage
    .save()
    .then((message) => res.json(message))
    .catch((err) => console.log(err));
});

router.put("/update/:id", (req, res) => {
  // Find all rooms
  Message.findOne({ _id: req.params.id }).then((message) => {
    if (!message) {
      return res.status(404).json({ messagenofound: "Message not found" });
    }
    const newMessage = {
      sender: message.sender,
      subject: message.subject,
      body: message.body,
      receiver: message.receiver,
      receiver_name: message.receiver_name,
      visited: true,
      manager_visited: message.manager_visited,
      date: message.date,
    };
    Message.findOneAndUpdate(
      { _id: req.params.id },
      newMessage,
      { upsert: true },
      (err, updatedMessage) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json(updatedMessage);
      }
    );
  });
});

router.put("/update/managerView/:id", (req, res) => {
  // Find all rooms
  Message.findOne({ _id: req.params.id }).then((message) => {
    if (!message) {
      return res.status(404).json({ messagenofound: "Message not found" });
    }
    const newMessage = {
      sender: message.sender,
      subject: message.subject,
      body: message.body,
      receiver: message.receiver,
      receiver_name: message.receiver_name,
      visited: message.visited,
      manager_visited: true,
      date: message.date,
    };
    Message.findOneAndUpdate(
      { _id: req.params.id },
      newMessage,
      { upsert: true },
      (err, updatedMessage) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json(updatedMessage);
      }
    );
  });
});

module.exports = router;
