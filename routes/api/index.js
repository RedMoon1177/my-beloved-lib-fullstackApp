var express = require('express');
const { route } = require('..');
var router = express.Router();

// register
var usersRouter = require('./users');
var songsRouter = require('./songs');
var booksRouter = require('./books')

//declare to use
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/books', booksRouter);

// use to handle the coming request
router.get('/', (req,res) => {
    res.send('Welcome to the API!')
});



module.exports = router