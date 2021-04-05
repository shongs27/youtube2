const express = require("express");
const router = express.Router();
const { Likes } = require("../models/Likes");
const { Dislikes } = require("../models/Dislikes");

router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Likes.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ try: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Dislikes.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ try: true, dislikes });
  });
});

router.post("/uplike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }
  console.log(variable);
  const like = new Likes(variable);
  like.save((err, likeResult) => {
    if (err) return res.json({ try: false, err });

    Dislikes.findOneAndDelete(variable).exec((err, dislikeResult) => {
      if (err) return res.json({ try: false, err });
      res.json(200).json({ try: true });
    });
  });
});

router.post("/unlike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Likes.findOneAndDelete(variable).exec((err, likeResult) => {
    if (err) return res.json({ try: false, err });
    res.json(200).json({ try: true });
  });
});

router.post("/upDislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const Dislike = new Dislikes(variable);
  Dislike.save((err, DislikeResult) => {
    if (err) return res.json({ try: false, err });

    Likes.findOneAndDelete(variable).exec((err, LikeResult) => {
      if (err) return res.json({ try: false, err });
      res.json(200).json({ try: true });
    });
  });
});

router.post("/unDislike", (req, res) => {
  let variable = {};
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Dislikes.findOneAndDelete(variable).exec((err, DislikeResult) => {
    if (err) return res.json({ try: false, err });
    res.json(200).json({ try: true });
  });
});

module.exports = router;
