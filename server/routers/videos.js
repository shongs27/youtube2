const express = require("express");
const router = express.Router();
const { Video } = require("../models/User");

const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

//=======================================
//   Video는 전송하려면 특이하게 해야한다
//=======================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let upload = multer({ storage }).single("file");

router.post("/uploadVideo", (req, res) => {
  //
  const video = new Video(req.body);
  //

  video.save((err, video) => {
    if (err) return res.json({ try: false, err });

    return res.json({ try: true });
  });
});

export default router;
