const mongoose = require('mongoose');

// Create resource model
const ContactUs =  mongoose.model('ContactUs', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true},
    date_created: { type: Date, default: Date.now},
}));

module.exports = ContactUs;