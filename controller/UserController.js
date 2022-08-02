const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/user");

exports.getData = async (req, res) => {
  const user = await User.find({});
  if (!user) {
    res.status(400).send({ message: "data not found" });
  }
  res.send(user);
};

exports.postData = async (req, res) => {
  const user = new User(req.body);

  console.log(user);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "data can not be inserted" });
  }
};
