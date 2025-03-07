const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Now we will fetch all the details of a user using the GET method. 
// But before that, we will check if the user is authentic or not,
//  for this, we are using a middleware ‘auth’ which will check if a user is authentic or not by using JSON Web Token.

// So first create another directory ‘middleware’ which contains 
// the ‘auth.js’ file.

// It will take a token and check if it exists then create a userID
//  using this token and check whether a user exists with this userID and if it exists then pass the user or else throw an error.

module.exports = async function(req, res, next) {
 
  if(!req.headers.authorization){
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];;
  console.log(req);

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    // Add the decoded user information to the request object
    const user = await User.findById(decoded.id);
    if(!user){
    return res.status(400).json({ message: 'User does not exist' });

    }
    req.user = user;


    // Call the next middleware function
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};