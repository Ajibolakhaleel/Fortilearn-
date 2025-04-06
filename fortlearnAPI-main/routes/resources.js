require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
var router = express.Router();
const User = require('../models/user');
const resource =require('../models/resources');
const authMiddleware = require('../middleware/resources');
const contact = require('../models/contact');





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
    return res.status({ error: 'Server Error', message: 'Could not create resource' })
}
})


// create contact us data
router.post('/contact', async (req, res) =>{

    try {
        const {name, email, subject, message } = req.body;
    
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        console.log(req.body)
        // initialize new class resource 
        const newContact = new contact({name, email, subject, message })
         await newContact.save() // save the resource to the db
        
        return res.status(200).json({message: 'contact us saved successfully'})
    } catch(err){
        return res.status({ error: 'Server Error', message: 'Could not create contact us' })
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

// ger the all contacts
router.get('/allcontacts', async (req, res) =>{
    try {
    let results = await contact.find({});
    return res.status(200).send({result: results})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error fetching data'})
    }
})

// get all contact us 
router.get('/contact', async (req, res) =>{
    try {
    let results = await contact.find({});
    return res.status(200).send({result: results})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error fetching data'})
    }
})

// get resource by id
router.get('/:id', authMiddleware, async (req, res) =>{
    try {
        let result = await resource.findById(req.params.id);
        return res.status(200).send({result})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:'error fetching data'})
    }
})


// enroll user to a resource
router.put('/enroll', authMiddleware, async (req, res) => {
    try {
        const userId = req.user; // Get user ID from middleware
        const { course } = req.body;

        // Find the user by ID
        let user = await User.findById(userId);

        // Check if user is not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already enrolled in the course
        const isEnrolled = user.enrolledResources.includes(course._id);

        if (isEnrolled) {
            return res.status(400).json({ status:'exist',  message: 'User is already enrolled in this course' });
        }

        // If not enrolled, add the course
        user.enrolledResources.push(course);
        await user.save();

        return res.status(200).json({status:'success', message: 'Course added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error processing enrollment' });
    }
});


// delete resource by id
router.delete('/:id', async (req, res) => {
    try {
        const resourceId = req.params.id;
        const deletedResource = await resource.findByIdAndDelete(resourceId);

        if (!deletedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        return res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting resource' });
    }
});

// update the resource by ID 
router.put('/:id', async (req, res) => {
    try {
        const resourceId = req.params.id;
        const updatedData = req.body;

        const updatedResource = await resource.findByIdAndUpdate(resourceId, updatedData, { new: true });

        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        return res.status(200).json({ message: 'Resource updated successfully', resource: updatedResource });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating resource' });
    }
});


// export this file
module.exports = router;


