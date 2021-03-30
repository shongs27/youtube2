const mongoose = require("mongoose");

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

const User = mongoose.model("User", UserSchema);

module.exports = { User };
