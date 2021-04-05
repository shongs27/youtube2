const mongoose = require("mongoose");

const DislikesSchema = mongoose.Schema(
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

const Dislikes = mongoose.model("Dislikes", DislikesSchema);

module.exports = { Dislikes };
