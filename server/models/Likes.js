const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    commentId: {
      type: mongoose.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: mongoose.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

const Likes = mongoose.model("Likes", likeSchema);

module.exports = { Likes };
