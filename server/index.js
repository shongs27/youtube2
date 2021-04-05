const express = require("express");
const app = express();
const path = require("path");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("몽고디비 접속완료"))
  .catch(() => console.log("몽고디비 접속 실패함"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//쿠키 API를 다루기 위해서
app.use(cookieParser());

//Router

app.use("/api/users", require("./routers/users"));
app.use("/api/videos", require("./routers/videos"));
app.use("/api/like", require("./routers/likes"));
app.use("/api/comments", require("./routers/comments"));

app.use("/uploads", express.static("uploads"));

app.use("/", (req, res) => {
  res.send("여기는 서버의 구역입니다");
});

app.listen(8080, () => {
  console.log("서버접속 완료");
});
