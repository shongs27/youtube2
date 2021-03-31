const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  //몽고 디비에 저장
  user.save((err, user) => {
    if (err) return res.json({ try: false, err });

    res.status(200).json({ try: true });
  });
});

router.post("/login", (req, res) => {
  User.findOne(req.body, (err, user) => {
    if (!user) {
      return res.json({
        try: false,
        err,
        message: "없는데 그런 사람?",
      });
    } else {
      return res.json({
        try: true,
        err,
        message: "찾았다 내사람",
      });
    }
  });
});

module.exports = router;
