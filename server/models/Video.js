const mongoose = require("mongoose");
const { User } = require("./User");

const VideoSchema = new mongoose.Schema(
  {
    Writer: {
      type: mongoose.ObjectId,
      ref: User,
    },
    Title: {
      type: String,
    },
    Views: {
      type: Number,
      defulat: 0,
    },
    Description: {
      type: String,
    },
    Category: {
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
