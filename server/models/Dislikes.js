const mongoose = require("mongoose");

const DislikeSchema = mongoose.Schema(
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

const Dislikes = mongoose.model("Dislikes", DislikeSchema);

module.exports = { Dislikes };
