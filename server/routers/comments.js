const express = require("express");
const router = express.Router();
const { Comments } = require("../models/Comments");

router.post("/getComment", (req, res) => {
  Comments.find({ videoId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ try: true, comments });
    });
});

router.post("/saveComment", (req, res) => {
  const comment = new Comments(req.body);
  comment.save((err, comments) => {
    if (err) return res.status(400).json({ try: false, err });

    //바로 populate를 쓸 수 없어서
    Comments.find({ _id: comments._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ try: false, err });
        res.status(200).json({ try: true, result });
      });
  });
});

module.exports = router;
