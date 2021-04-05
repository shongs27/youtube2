const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    // unique: 1,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// UserSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     bcrypt.genSalt(5, function (err, salted) {
//       if (err) return next(err);

//       bcrypt.hash(this.password, salted, function (err, hash) {
//         if (err) return next(err);
//         this.password = hash;
//         next();
//       });
//     });
//   } else {
//     return;
//   }
// });

UserSchema.methods.generateToken = function (cb) {
  var user = this;

  const token = jwt.sign(user._id.toHexString(), "hongs");
  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);

    return cb(null, user);
  });
};

UserSchema.statics.findByToken = function (token, cb) {
  //jwt복원
  jwt.verify(token, "hongs", (err, decoded) => {
    User.findOne({ _id: decoded, token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
