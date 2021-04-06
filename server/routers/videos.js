const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");

//파일을 업로드 할 수 있게 도와주는 패키지
const multer = require("multer");
const path = require("path");
//비디오 오디오 변환 프로그램
const ffmpeg = require("fluent-ffmpeg");

//=======================================
//   Video는 전송하려면 특이하게 해야한다 (거꾸로 기입함)
//=======================================

router.post("/getVideoDetail", (req, res) => {
  
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, video) => {
      console.log(video)
      if (err) return res.status(400).send(err);
      return res.status(200).json({ try: true, video });
    });
});

router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      //여러개일때 배열의 형태로 반환하네
      if (err) res.status(400).send(err);
      res.status(200).json({ try: true, videos });
    });
});

router.post("/thumbnail", (req, res) => {
  let filePath = "";
  let fileDuration = "";

  //썸네일 정보 가져오기
  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    fileDuration = metadata.format.duration;
  });

  //썸네일 생성
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", () => {
      console.log("스크린샷 다 찍음");
      return res.json({ try: true, url: filePath, fileDuration: fileDuration });
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ try: false, err });
    })
    .screenshots({
      // take screenshots 20$ 40$ 60% and 80%
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      //'%b' input basename
      filename: "thumbnail-%b.png",
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let upload = multer({ storage }).single("thatData");

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) throw err;

    return res.json({
      try: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadVideo", (req, res) => {
  //
  const video = new Video(req.body);
  //

  video.save((err, video) => {
    if (err) return res.json({ try: false, err });

    return res.json({ try: true });
  });
});

module.exports = router;
