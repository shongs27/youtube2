const express = require("express");
const app = express();
const path = require("path");
const config = require("./config/key");

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
// app.use(cookieParser());

//Router

app.use("/api/users", require("./routers/users"));

app.use("/", (req, res) => {
  res.send("여기는 서버의 구역입니다");
});

app.listen(8080, () => {
  console.log("서버접속 완료");
});
