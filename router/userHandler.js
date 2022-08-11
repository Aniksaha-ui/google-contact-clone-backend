const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Contact = require("../model/contacts");
const e = require("express");
const nodemailer = require("nodemailer");
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
  const tempPassword = Math.floor(1000 + Math.random() * 9000);
  user.password = tempPassword;
  const {password} = user;
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
    // console.log("found");
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
    // console.log("Not found");
  }

  
});

//get my contact
router.get("/mycontact" ,async(req,res)=>{
  
  const useremail = req.query.useremail;
  // console.log(useremail);
  const contact = await Contact.find({useremail:useremail});
  // console.log(contact)
 res.send(contact)
   
})

//post a new contact

router.post("/mycontact", async(req,res)=>{
    // console.log(req.body)
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
  // main().catch(console.error);
  res.send(user);
});

async function main(email,password) {
  
  // console.log("function called",email)
 
  var transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
      user:"2018-1-60-181@std.ewubd.edu",
      pass:"vwgtsqlinehvzaml"
    }
  });

  var mailOptions = {
    from: "2018-1-60-181@std.ewubd.edu",
    to:`${email}`,
    subject:"authentication",
    text:`Your OTP is ${password}.You can change you password in the following link : http://localhost:4200/otpVarification`,
  }

  transport.sendMail(mailOptions,function(err,info){
    if(err){
      console.log(err)
    }else{
      console.log("Email send")
    }
  });
 
}


//authorization and otp send
router.get("/authentication/:id",  async (req, res) => {
  const _id = req.params.id;
  console.log(_id)
  const userUpdateAuth = await User.updateOne({_id
    : _id}, { authentication: 1 })
    const user = await User.find({_id:_id})
    const {email,password} = user[0];
    // console.log(email,password);
    await main(email,password).catch(console.error);
    if (!userUpdateAuth) {
    res.status(400).send({ message: "Authentication is not done" });
  }
  res.send(userUpdateAuth);
});

//otp verify
router.post("/verifyotp",async(req,res)=>{
  
  const otpInfo = req.body;
  const {otp,email} = otpInfo;
  
  const userVerify = await User.find({email:email,password:otp});
  if(userVerify.length>0){
    res.send({status:200})
  } else{
    res.send({status:404})
  }

})

router.get('/changePassword/:email/:password',async(req,res)=>{
  const email = req.params.email;
  const password = req.params.password;
  console.log(email,password)
  const userUpdateAuth = await User.updateOne({email
    : email}, { password: password })

   res.send(userUpdateAuth) 
})



module.exports = router;
