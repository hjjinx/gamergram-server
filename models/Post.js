const mongoose = require("mongoose");
const Joi = require("joi");

exports.Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: { type: String, minlength: 3, maxlength: 1024, required: true },
    },
    {
      timestamps: true,
    }
  )
);

exports.validatePost = vali = (post) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    content: Joi.string().required().min(5).max(1024),
  });
  return schema.validate(post);
};
