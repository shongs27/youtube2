const { User } = require("../../models/User");

const auth = (req, res, next) => {
  const token = req.cookies.Valid;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, err: true });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
