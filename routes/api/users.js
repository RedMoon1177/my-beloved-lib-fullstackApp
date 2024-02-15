var express = require('express');
var router = express.Router();
var User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find().exec()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});



// endpoint for register
router.post('/register', (req, res) => {

  const newUser = new User(req.body);

  newUser.validate()
    .then(() => {
      // Data is valid
      console.log('Data is valid.');

      // hash pwd before saving
      const { firstName, lastName, email, password } = req.body;
      bcrypt.hash(password, 10, (err, hashpwd) => {
        if (err) { res.status(500).send({ message: "Server can not encode your password!!!" }) }

        // save req.body with hash pwd
        newUSer = new User({ firstName, lastName, email, password: hashpwd });

        newUSer.save()
          .then(result => {

            const token = jwt.sign(email, process.env.JWT_SECRET);

            //add token to httpOnly cookie
            // Set a cookie with the secure and HttpOnly flags
            const cookieOptions = {
              httpOnly: true,
              secure: true,
              path: '/'
            };
            const cookieString = cookie.serialize('jwt', token, cookieOptions);
            // Set the cookie in the response header
            res.setHeader('Set-Cookie', cookieString);

            res.status(201).send(result);
          })
          .catch(err => res.status(500).send({ message: "Server Error, come back soon." }));
      });
    })
    .catch((error) => {

      // Handle validation errors
      if (error.name === "ValidationError") {
        res.status(422).send(error)
      } else {
        res.status(500).send({ message: "Server Error, come back soon." })
      }
    });

});




// endpoint for login
router.post('/login', (req, res) => {

  const { email, password } = req.body;

  // check for the existing user
  User.findOne({ email }).exec()
    .then(user => {
      if (user) {
        // console.log('Found user:', user);

        // verify the pw against the hash

        bcrypt.compare(password, user.password, (err, isMatch) => {

          // if good pw then return with token
          if (isMatch) {
            const token = jwt.sign(email, process.env.JWT_SECRET);

            // // add token to custom header
            // res.header('Access-Control-Expose-Headers', 'x-auth-token')
            // res.header('x-auth-token', token)

            //add token to httpOnly cookie
            // Set a cookie with the secure and HttpOnly flags
            const cookieOptions = {
              httpOnly: true,
              secure: true,
              path: '/'
            };
            const cookieString = cookie.serialize('jwt', token, cookieOptions);
            // Set the cookie in the response header
            res.setHeader('Set-Cookie', cookieString);

            res.status(200).send({
              // email, password
              ServerMessage: 'logined successfully!'
            });
          } else {
            res.status(400).send('Password is not matched!!!');
          }
        }
        );

      } else {

        res.status(404).send('Email is not found!!!');
      }
    })
    .catch(err => {
      console.log('Error: ', err);

      if (err.name === "Validator Error") {
        res.status(422).send(err)
      } else {
        res.status(500).send({
          message: "Server Error, come back soon."
        })
      }
    });
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.status(204).send();
})

module.exports = router;
