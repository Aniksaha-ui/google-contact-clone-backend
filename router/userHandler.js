const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { getData, postData } = require("../controller/UserController");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

//verify jwt token
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}
//verify jwt token

//signup
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  const { email } = req.body;
  try {
    await user.save();
    const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "data can not be inserted" });
  }
});

//login
router.post("/login", async (req, res) => {
  const user = req.body;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: "1d",
  });
  // console.log(user);
  res.send({ accessToken });
});

router.get("/", async (req, res) => {
  const user = await User.find({});
  if (!user) {
    res.status(400).send({ message: "data not found" });
  }
  res.send(user);
});
module.exports = router;
