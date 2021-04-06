const mongoose = require("mongoose");
const { User } = require("./User");

const VideoSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.ObjectId,
      ref: User,
    },
    title: {
      type: String,
    },
    views: {
      type: Number,
      defulat: 0,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    FilePath: {
      type: String,
    },
    Duration: {
      type: Number,
    },
    ThumbnailPath: {
      type: String,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
