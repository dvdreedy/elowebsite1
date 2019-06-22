const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route get api/users
//desc see all users
//public
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ rating: -1, name: 1 });

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route get api/users
//desc see all users alphabetically
//public
router.get("/alphabetical", async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//get one user
//
router.get("/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(500).send("Server Error");
  }
});

// register users
// register users
//public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 6 }),
    check(
      "password",
      "Please enter a password with 35 or less characters"
    ).isLength({ max: 35 }),
    check("email", "Please enter a valid email").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },

        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
