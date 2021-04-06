const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("./middleware/auth");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  //몽고 디비에 저장
  user.save((err, user) => {
    if (err) return res.json({ try: false, err });

    res.status(200).json({ try: true });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ try: false, err });

    if (user.password === req.body.password) {
      //토큰을 만들어서 1. 저장소에 저장 2. 로컬cookie에 저장
      user.generateToken((err, user) => {
        if (err) return res.json({ try: false, err });

        res
          .cookie("Valid", user.token)
          .status(200)
          .json({ try: true, userId: user._id });
      });
    } else {
      return res.json({ try: false, err });
    }
  });
});

// 미들웨어 auth를 통해 유저정보 user가 res로 돌아오겠지
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    token: req.token,
    //password뺴고 다 보내네
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ try: false, err });
    return res.status(200).json({ try: true });
  });
});

module.exports = router;
