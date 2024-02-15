const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title: 
    { 
        type: String,
        required: true
    },
    artist: 
    {
        type: String,
        required: true
    },
    releaseYear: Number,
    genres: [String],
    ratings: [Number]
}, {Collection: 'CoolSongs'})

module.exports = mongoose.model('Song', songSchema);