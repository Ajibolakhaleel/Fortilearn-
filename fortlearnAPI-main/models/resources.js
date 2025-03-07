//const express = require('express');
const mongoose = require('mongoose');

// Create resource model
const Resource =  mongoose.model('Resources', new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true},
    date_created: { type: Date, default: Date.now},
    levelClass: { type: String, required: true},
    category: { type: String, required: true},
    resourceLink: { type: String, required: true},
}));

module.exports = Resource;