const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//item model
const User = require("../../models/user.js");

//@route POST api/users
//@description register new user
//@access public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please fill up all fields" });
  }
  //check existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "user already exists" });

    const newUser = new User({
      name,
      email,
      password
    });
    //create salt && hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        });
      });
    });
  });
});
module.exports = router;
