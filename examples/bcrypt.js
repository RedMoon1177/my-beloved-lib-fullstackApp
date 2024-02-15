const bcrypt = require('bcrypt')

// bcrypt.hash('abc123', 10, (err, hash) => {
//     console.log(hash)
// })


bcrypt.compare('abc124', 
                '$2b$10$qShdT4wCujbm1dBNBWpWx.O9170BQx6uzs76eXe8aERG3LW0rRdHq', 
                (err, isMatch) => {
                    console.log(isMatch);
                }
);