const express = require('express');
const mongoose = require('mongoose');
const users = require('../models/user');
var router = express.Router();


// get all users
router.get('/', async (req, res) =>{
    try {
        let results = await users.find({});
        return res.status(200).send({result: results})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error fetching data'})
    }
})

// delete user by id 
router.delete('/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        console.log(id)
        let result = await users.findByIdAndDelete(id);
        return res.status(200).send({result})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error deleting data'})
    }
})
module.exports = router;