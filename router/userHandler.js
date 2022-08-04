const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { getData, postData } = require("../controller/UserController");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Contact = require("../model/contacts");
const e = require("express");
require("dotenv").config();

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
  const email = req.body.email;
  const password = req.body.password;

  const userFound = await User.find({email:email,password:password})
  if(userFound.length>0){
    console.log("found");
    const token = jwt.sign(
    { email: email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  if(token){
    res.send({status:200, token });
  }
   

  }else{
    res.send({status:404,massage:"data not found"})
    console.log("Not found");
  }

  
});

//get my contact
router.get("/mycontact",verifyJWT ,async(req,res)=>{
  const decodedEmail = req.decoded.email;
  const email = req.query.email;
  if (email === decodedEmail) {
    const contact = Contact.find({})
    res.send(contact);
  } else {
    res.status(403).send({ message: "forbidden access" });
  } 
})

//post a new contact

router.post("/mycontact", async(req,res)=>{
  
    const contact = new Contact(req.body);
    try{
     const contactInfo = await contact.save();
     res.send({contact,"message":"data inserted"});
    } catch{

    }
});


//get all users
router.get("/",  async (req, res) => {
  const user = await User.find({});
  if (!user) {
    res.status(400).send({ message: "data not found" });
  }
  res.send(user);
});




module.exports = router;
