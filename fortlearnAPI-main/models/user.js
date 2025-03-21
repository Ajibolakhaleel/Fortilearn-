//const express = require('express');
const mongoose = require('mongoose');

// Create user model. Note: move to user model
const User =  mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    specialisation:{type: String, required:true },
    specificRes: [{ type: mongoose.Schema.Types.Mixed, ref: 'specificRes' }],
    
}));

module.exports = User;