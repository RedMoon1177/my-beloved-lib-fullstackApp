var express = require('express')
var router = express.Router();
var Book = require('../../models/book');
var jwtValidation = require('../../middleware/jwtValidation');

// set jwt validation for all endpoints here
// router.use(jwtValidation);

router.get('/', (req, res) => {

    // res.send('GET ALL BOOKS');
    Book.find().exec()
        .then(books => {
            res.send(books);
        })
        .catch(err => {
            res.status(500).send()
        })
});

router.get('/:id', (req, res) => {
    // res.send(`GET ONE BOOK BY ID ${req.params.id}`);

    Book.findOne({ _id: req.params.id })
        .then(book => {
            // res.status(200).json({ book });
            res.status(200).send(book);
        })
        .catch(err => {
            res.status(404).send();
        })
});

// set jwtValidation for posting new data to the db
router.post('/', jwtValidation, (req, res) => {

    // for testing: res.send(req.body);

    const newBook = new Book(req.body);
    newBook.save()
        .then(result => res.status(201).send(result))
            .catch(err => {
                console.log(err.name);
                if (err.name == "ValidationError") {
                    res.status(422).send(err);
                }
            });

});

// set jwtValidation for updating data from the db
router.put('/:id', jwtValidation, (req, res) => {
    // res.send(`UPDATE SONG WITH ID ${req.params.id}`);

    Book.updateOne({ _id: req.params.id }, { $set: req.body })
        .then(result => res.status(200).send())
        .catch(err => {
            console.log(err);
            res.status(400)
        })
});

// set jwtValidation for deleting an existing data from the db
router.delete('/:id', jwtValidation, (req, res) => {
    // res.send(`DELETE ONE BOOK BY ID ${req.params.id}`);

    Book.deleteOne({ _id: req.params.id })
        .then(result => res.status(200).send())
        .catch(err => { console.log(err) })
});

module.exports = router;