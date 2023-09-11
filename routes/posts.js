const router = require("express").Router();
const User = require("../model/User");
const verifyToken = require("./verifyToken");

router.get("/", verifyToken, async (req, res) => {
  const user = await User.findOne({_id: req.user.id});
  //   console.log(user);
  res.json(user);
});

module.exports = router;
