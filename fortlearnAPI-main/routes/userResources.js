const express =require('express');
var router= express.Router();
const Resource= require('../models/resources');
const User= require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const app = require('../app');
const mongoose = require('mongoose');

//const app1=express();
//app1.use(express.json());
//route to get personalized resources according to user
router.get('/get',async (req,res) => {
    try {
        //get token
        const token= req.headers.authorization;

        if(!token){
            return res.status(500).json({message: 'Login required'});
        }
        //token debugging
        console.log("Received Token:", token);  // Debugging step

        // Ensure token is in correct format
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(400).json({ message: 'Invalid token format' });
        }

        // Extract only the actual JWT token
        const actualToken = tokenParts[1];


         // Verify token
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);


        // Find user by ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find resources matching user specialization
        const userResources = await Resource.find({ type: user.specialisation });

        res.status(200).json({user: user, resources: userResources });

    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
    
});

//router.post('/post',async)
//logic, button clicked on resource.Assigns that resource to that user.

// save specific resources 
// Route to assign a resource to an authenticated user


router.post('/assignResource', auth, async (req, res) => {
    try {

        // Validate input
        if (!req.body.resources || !Array.isArray(req.body.resources)) {
            return res.status(400).json({ message: 'Resources array is required' });
        }

        const user = req.user;
        const assignedResources = [];
        const failedResources = [];

        // Get existing resource IDs to avoid duplicates
        // const existingResourceIds = user.specificRes.map(item => 
        //     item.resource.toString()
        // );

        // Process each resource
        for (const resourceData of req.body.resources) {
            try {
                // Clean and extract resource ID
                let resourceIdString = resourceData._id;
                
                if (typeof resourceIdString !== 'string') {
                    throw new Error('Invalid resource ID');
                }

                // Remove ObjectId wrapper if present
                if (resourceIdString.includes('ObjectId(')) {
                    resourceIdString = resourceIdString.replace(/^ObjectId\((.*)\)$/, '$1').trim().replace(/^"(.*)"$/, '$1');
                }

                // Find the resource
                const resource = await Resource.findById(resourceIdString);
                if (!resource) {
                    failedResources.push({
                        id: resourceIdString,
                        reason: 'Resource not found'
                    });
                    continue;
                }

                // Check if resource is already assigned
                if (existingResourceIds.includes(resourceIdString)) {
                    failedResources.push({
                        id: resourceIdString,
                        reason: 'Resource already assigned'
                    });
                    continue;
                }

                // Assign resource to user's specificRes array
                user.specificRes.push({ resource });
                assignedResources.push(resource);

                // Add to existing resource IDs to prevent further duplicates
                existingResourceIds.push(resourceIdString);

            } catch (error) {
                failedResources.push({
                    id: resourceData.id,
                    reason: error.message
                });
            }
        }

        // Save user after processing all resources
        await user.save();

        // Prepare response
        res.status(200).json({
            message: 'Resources processed',
            assignedResources,
            failedResources, 
            totalAssigned: assignedResources.length
        });

    } catch (error) {
        console.error('Assign Resource Error:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            error: error.message 
        });
    }
});


  
module.exports=router;

