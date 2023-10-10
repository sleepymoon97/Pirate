const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getToken = (user) => {
  const payload = {
    id: user._id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY);
};

module.exports = {
  register: (req, res) => {
    User.exists({ email: req.body.email })
      .then((userExists) => {
        if (userExists) {
          return Promise.reject({
            errors: { email: { message: "Email exists" } },
          });
        }
        return User.create(req.body)
          .then((user) => {
            res
              .cookie("usertoken", getToken(user), {
                httpOnly: true,
              })
              .json({ msg: "success!", user: user });
          })
          .catch((err) => res.json(err));
      })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      return res.sendStatus(400);
    }

    res
      .cookie("usertoken", getToken(user), {
        httpOnly: true,
      })
      .json({ msg: "success!" });
  },
  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
  },
};
