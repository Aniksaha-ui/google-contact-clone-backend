const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {getData,postData} = require("../controller/UserController")

const User = require("../model/user");

router.route("/").get(getData);
router.route("/").post(postData);
module.exports = router;