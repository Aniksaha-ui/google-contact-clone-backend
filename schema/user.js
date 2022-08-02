const mongoose = require("mongoose");
const {validator} = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js')
const userSchema = mongoose.Schema({
 
  firstName:{
    type:String,
    required:true,
    trim: true
  },
  lastName:{
    type:String,
    required:true,
    trim: true
  },

  email: {
    type:String,
    required: true, 
    trim: true,
    lowercase: true
    // validate(value){
    //     if(!validator.isEmail(value)){
    //         throw new Error("invalid error")
    //     }
    // }
  },
 
  password: {
    type:String,
    required: true, 
    trim: true,
    minlength:7,
    // validate(value){
    //     if(value.toLowerCase().includes('password')){
    //         throw new Error(`password can not contain the keyword "password" `)
    //     }
    // }
  },

  authentication:{
    type: Number,
    default: 0
  },
    
  phone: {
    type:Number,
    trim: true
    // validate(value){
    //     if(!validatePhoneNumber.validate(value)){
    //         throw new Error(`Not a valid phone number`)
    //     }
    // }
  },
});

module.exports = userSchema;