const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({
    title: 
    {
        type: String,
        required: true,
        maxlength: 100
    },
    description: 
    {
        type: String,
        required: true
    },
    author: 
    {
        type: String,
        required: true,
        maxlength: 50
    },
    genre: [String],
    publisher: String,
    price: Number,
    year: Number,
    ISBN:
    {
        type: String,
        maxlength: 50
    },
    cover: String,
    libId: 
    {
        type: String,
        maxlength: 50
    }
})

module.exports = mongoose.model('Book', bookSchema);