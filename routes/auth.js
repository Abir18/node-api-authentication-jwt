const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {registrationValidation, loginValidation} = require("../validation");

// Register new user route
router.post("/register", async (req, res) => {
  const {error} = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send("Email already exit");

  try {
    const savedUser = await user.save();
    res.status(200).json({user: user._id});
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user)
      return res.status(400).send({message: "No user found on this email"});

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({message: "Invalid password"});

    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
    res.header("auth_token", token).send({login: true, token});
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
