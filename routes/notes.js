const note = require('express').Router();
const fs = require('fs');

// GET function for path http://localhost:3001/api/notes
note.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataNotes = JSON.parse(data);
            res.json(dataNotes);
        }
    });

});

// POST function for path http://localhost:3001/api/notes
note.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;


    if (text && title) {

        const newReview = {
            text,
            title,
            id: Math.floor(Math.random() * 10000)
        };
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const dataNotes = JSON.parse(data);
                dataNotes.push(newReview);
                fs.writeFile('./db/db.json', JSON.stringify(dataNotes, null, '\t'), (err) => console.error(err))
            }
        })
        res.end();
    }
})

// delete function for path http://localhost:3001/api/notes/:id (deleting id that was choosen)
note.delete('/:term', (req, res) => {
    const requestID = req.params.term;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataNotes = JSON.parse(data);
            let newDataNotes = dataNotes.filter(el => el.id !== parseInt(requestID));
            fs.writeFile('./db/db.json', JSON.stringify(newDataNotes, null, '\t'), (err) => console.error(err));

        }
    });
    res.send(requestID);
});

module.exports = note;