const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const { User, validateUser } = require("../models/user");
const { Post, validatePost } = require("../models/Post");
const authenticateToken = require("../misc/authenticate");

const router = express.Router();

/*
    /api/posts/create
*/
router.post("/create", authenticateToken, async (req, res) => {
  let post = { content: req.body.content, author: req.body.userId };
  const { error } = validatePost(post);
  if (error) return res.status(400).json({ message: error.details[0].message });

  post = new Post(post);
  post
    .save()
    .then(() => {
      res.send(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "There was an error" });
    });
});

module.exports = router;
