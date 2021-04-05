const express = require("express");
const router = express.Router();

router.post(`/getComment`, (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      console.log(comments);
      if (err) return res.status(400).send(err);
      res.status(200).json({ try: true, comments });
    });
});

module.exports = router;
