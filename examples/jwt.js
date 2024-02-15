const jwt = require('jsonwebtoken');

// const token = jwt.sign({email: 'anne@anne.com'}, process.env.JWT_SECRET);

// console.log(token);

jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmVuZ3V5ZW5AZ21haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.No7E_p5hLPDckOmPjOS3PJxDUXNOuWMFuc3B0lpbwp', 'abc123', 
(err, decoded) => {
    if (err) {
    //   return res.status(401).json({ message: 'Invalid token' });
    console.log('Invalid token');
    } else {

    // Token is valid, you can use the 'decoded' payload as needed
    // return res.status(200).json({ message: 'Token is valid', decoded });
    console.log('Token is valid');}
  });