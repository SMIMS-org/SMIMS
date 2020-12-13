const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validatePasswordResetInput = require("../validators/password_reset.v");
const validateRegisterEmployeeInput = require("../validators/employee.v");
const validateRegisterInput = require("../validators/tenant.v");
const validateLoginInput = require("../validators/login.v");

let User = require("../models/user.model");

// Register Tenant
router.post("/register/tenant", (req, res) => {
  // Form validation
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        tin: req.body.tin,
        comp_name: req.body.comp_name,
        phone_no: req.body.phone_no,
        address: req.body.address,
        user_type: req.body.user_type,
        confirm: req.body.confirm,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Password reset
router.put("/tenant/resetPassword", (req, res) => {
  const { errors, isValid } = validatePasswordResetInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;

      User.findByIdAndUpdate(
        req.body.u_id,
        { password: hash, confirm: true },
        { new: true }
      )
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json(err));
    });
  });
});

router.post("/register/employee", (req, res) => {
  // Form validation
  console.log(req.body);
  const { errors, isValid } = validateRegisterEmployeeInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        address: req.body.address,
        user_type: req.body.user_type,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Get User
router.get("/getAll", (req, res) => {
  User.find({}).then((users) => {
    // Check if user exists
    if (!users) {
      return res.status(404).json({ usersnotfound: "Users not found" });
    }
    return res.status(200).json(users);
  });
});

// Get tenants
router.get("/getTenants", (req, res) => {
  // Find user by user type
  User.find({ user_type: "tenant" }).then((users) => {
    // Check if user exists
    if (!users) {
      return res.status(404).json({ usersnotfound: "Users not found" });
    }
    return res.status(200).json(users);
  });
});

// Get User
router.get("/:id", (req, res) => {
  // Find user by email
  User.findOne({ _id: req.params.id }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    return res.status(200).json(user);
  });
});

module.exports = router;
