var express = require('express');
var router = express.Router();
var Song = require('../../models/song');
const e = require('express');

router.get('/', (req,res) => {
    // res.send('GET ALL SONGS');

    console.log(Song.find().exec()   // exec return a promise
                            .then(songs => {
                                res.send(songs)
                            })
                            .catch(err => {
                                res.status(500).send()
                            }))
});

router.get('/:id', (req, res)=> {
    // res.send(`GET ONE SONG WITH ID ${req.params.id}`);

    Song.findById(req.params.id).exec()
        .then(song => {
            if(!song)
            {
                res.status(404).send()
            } else
            {
                res.status(200).send(song)
            }
        })
        .catch(err => {
            if(err.name == "CastError")
            {
                res.status(400).send({
                    message: "Invalid id provided"
                })
            } else
            {
                res.status(500).send({
                    message: "Server Error, come back soon, it's not your fault."
                })
            }
        })
});


router.post('/', (req, res)=> {
    // res.send('POST NEW SONG');

    const newSong = new Song(req.body);

    newSong.save()
            .then(result => res.status(201).send(result))
            .catch(err => { 
                if(err.name === "ValidationError")
                {
                    res.status(422).send(err)
                } else
                {
                    res.status(500).send({
                        message: "Server Error, come back soon."
                    })
                }
            });

});


router.put('/:id', (req, res)=> {
    // res.send(`UPDATE SONG WITH ID ${req.params.id}`);

    Song.findByIdAndUpdate(req.params.id).exec()
        .then(song => {
            if(!song)
            {
                res.status(404).send()              // can not find the song
            } else
            {
                res.status(200).send(song)          // well updated
            }
        })
        .catch(err => {
            if(err.name == "Validation Error")
            {
                res.status(422).send(err)
            } else if(err.name == "CastError")      // invalid ID
            {
                res.status(400).send({
                    message: "Invalid id provided"
                })
            } else
            {
                res.status(500).send({
                    message: "Server Error, come back soon."    // other errors
                })
            }
        })

});


router.delete('/:id', (req, res)=> {
    // res.send(`DELETE SONG WITH ID ${req.params.id}`);

    // check that the song exists
    Song.findByIdAndDelete(req.params.id).exec()
        .then(result => {
            if(!result)
            {
                res.status(404).send() // nothing to delete
            } else
            {
                res.status(204).send() // delete successfully
            }
        })
        .catch(err => {
            if(err.name == "CastError")
            {
                res.status(400).send({
                    message: "Invalid id provided"
                })
            } else
            {
                res.status(500).send({
                    message: "Server Error, come back soon."
                })
            }
            
        })
});


module.exports = router;