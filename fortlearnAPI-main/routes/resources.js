require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
var router = express.Router();
const resource =require('../models/resources');




// route to create a new resource
router.post('/create', async (req, res) =>{

try {
    const {type, title, description, levelClass, category, resourceLink } = req.body;

    if (!type || !title || !description || !levelClass || !category || !resourceLink) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // initialize new class resource 
    const newResource = new resource({type, title, description, levelClass, category, resourceLink })
    const savedResource = await newResource.save() // save the resource to the db
    
    return res.status(200).json({message: 'resource saved successfully',   resource: {
        id: savedResource._id,
        title: savedResource.title,
        type: savedResource.type,
        category: savedResource.category,
        created: savedResource.date_created,
    }})
} catch(err){
    console.log(err)
    return res.status({ error: 'Server Error', message: 'Could not create resource' })
}
})

// get all resources
router.get('/all', async (req, res) =>{
    try {
    let results = await resource.find({});
    return res.status(200).send({result: results})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error fetching data'})
    }
})


// export this file
module.exports = router;


