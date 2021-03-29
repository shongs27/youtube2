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

module.exports = router;
