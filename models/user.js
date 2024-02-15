const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: 
    {
        type: String,
        required: true,
        maxlength: 100
    },
    lastName: 
    {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true, // Makes the email field unique
        validate: {
          validator: function(value) {
            // Use a regular expression to check if the email is valid
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
          },
          message: 'Invalid email format',
        },
      },
    password: {
        type: String,
        required: true,
        maxlength: 255,
      }
})

const User = mongoose.model('User', userSchema);

// Disable automatic validation
User.schema.set('validateBeforeSave', false);

module.exports = User;
