// Initializing express and store it in the variable
const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();
const fs = require('fs');
// Import api route file
const api = require('./routes/index.js');
// Adding path for http://localhost:3001/api 
// app.use('/api', api);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//  GET function for main screen http://localhost:3001
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
//  GET function for http://localhost:3001/notes end
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET function for path http://localhost:3001/api/notes
app.get('/api/notes', (req, res) => {
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
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (text && title) {
        const newNote = {
            text,
            title,
            id: Math.floor(Math.random() * 10000)
        };
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const dataNotes = JSON.parse(data);
                dataNotes.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(dataNotes, null, '\t'), (err) => console.error(err))
            }
        })
        res.end();
    }
});

// delete function for path http://localhost:3001/api/notes/:id (deleting id that was choosen)
app.delete('/api/notes/:term', (req, res) => {
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
// server listenner when user trying to get http://localhost:3001 
app.listen(PORT, () =>
    console.log(`app listennig : http://localhost:${PORT}`));