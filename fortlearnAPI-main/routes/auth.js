require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../models/user');


//connect to mongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("error connecting to the db", err))



// route to register user
router.post('/register', async (req, res) =>{
    try{
    const {username, email, password, specialisation } = req.body;
    // check if the user exist
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.json({message: "user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // create new user
    const newUser = await User.create({username, email, password: hashedPassword, specialisation})
    // create new jwt token for the user
    const token = jwt.sign(
        {userId: User._id, email: User.email, username: User.username, specialisation:User.specialisation},
        process.env.JWT_SECRET,
    )
    res.status(200).json({message: 'user registered successfully', token: token, newUser:newUser});
    
    } catch (error){
        return res.status(500).json(error);
    }
})

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: '"email" is required' });
        }
        if (!password) {
            return res.status(400).json({ message: '"password" is required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        // Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not set in environment variables' });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

        // Generate a JWT token (FIXED ORDER)
        const token = jwt.sign(
            { id: user._id,email: user.email, username: user.username }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Options
        );

        // Return token
        res.status(200).send({ token ,user:user});

    } catch (error) {
        console.error("Login Error:", error); // Debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});




module.exports = router;
