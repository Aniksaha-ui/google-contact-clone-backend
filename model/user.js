const mongoose = require("mongoose");
const userSchema = require("../schema/user");
const User = new mongoose.model("user", userSchema);

module.exports = User;