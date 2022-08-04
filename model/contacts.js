const mongoose = require("mongoose");
const contactSchema = require("../schema/contact");
const Contact = new mongoose.model("contact", contactSchema);
module.exports = Contact;