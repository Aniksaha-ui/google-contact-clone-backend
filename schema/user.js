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

  },
 
  password: {
    type:String,
    required: true, 
    trim: true,
    minlength:4,

  },

  authentication:{
    type: Number,
    default: 0
  },
    
  phone: {
    type:Number,
    trim: true

  },
});

module.exports = userSchema;