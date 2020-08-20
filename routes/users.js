const express = require("express");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user)
    return res.status(400).json({
      message: `This ${
        user.username === req.body.username ? "username" : "email address"
      } is already registered`,
    });

  user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "There was an error" });
    });
});

router.post("/login", (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ $or: [{ email: email }, { username: username }] })
    .then(async (user) => {
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { _id: user._id },
        require("../secret.json").jwtKey
      );
      res.status(200).json({ message: "success", token });
    })
    .catch((err) => {
      console.log("Error in finding user");
      console.log(err);
    });
});

module.exports = router;
