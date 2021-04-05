const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    writer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.ObjectId,
      ref: "Video",
    },
    responseTo: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = { Comments };
