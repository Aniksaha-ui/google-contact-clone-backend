const mongoose = require("mongoose");
const {validator} = require("validator")
const validatePhoneNumber = require('validate-phone-number-node-js')
const contactSchema = mongoose.Schema({

  userId:{
    type:String, 
  },
  firstName:{
    type:String,
    required:true,
    trim: true
  },

  middleName:{
    type:String,
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
  company:{
    type: String,
    default: "ERA Infotech"
  },
  job: {
    type:String,
    trim: true,
  },
  depart: {
    type:String,
    trim: true,
  },
  phone: {
    type:Number,
    trim: true,
    required:true
  },
  Birthday: {
    type:Date,
    trim: true,
  },
  city: {
    type:String,
    trim: true
  },
  postalcode: {
    type:String,
    trim: true
  },
  website: {
    type:String,
    trim: true
  },
  address: {
    type:String,
    trim: true
  },
  image:{
    type:String
  },
  notes:{
    type:String
  },
  useremail:{
    type:String
  }

});

module.exports = contactSchema;