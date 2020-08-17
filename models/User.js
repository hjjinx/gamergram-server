const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: { type: String, required: true, minlength: 5, maxlength: 255 },
  })
);

exports.validateUser = vali = (user) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    email: Joi.string().email().required().min(5).max(255),
    password: Joi.string().required().min(5).max(255),
  });
  return schema.validate(user);
};

exports.User = User;
