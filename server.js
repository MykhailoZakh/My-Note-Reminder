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
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataNotes = JSON.parse(data);
            res.json(dataNotes);
        }
    });

})

app.post('/api/notes', (req, res) => {

    console.log(req.body);
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (text && title) {
        // Variable for the object we will save
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

app.delete('/api/notes/:term', (req, res) => {
    const requestID = req.params.id;
    console.log(requestID);
    res.end();
})
// server listenner when user trying to get http://localhost:3001 
app.listen(PORT, () =>
    console.log(`app listennig : http://localhost:${PORT}`));