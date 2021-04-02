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

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    // token: req.token,
    //password뺴고 다 보내네
  });
});

module.exports = router;
