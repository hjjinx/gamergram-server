const express = require("express");
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcryptjs");

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
  const { userOrEmail, password } = req.body;
  const whatIsIt = "email";
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (userOrEmail.search(emailRegEx) === -1) {
    whatIsIt = "username";
  }
});

module.exports = router;
