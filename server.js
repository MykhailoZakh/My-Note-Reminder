// Initializing express and store it in the variable
const express = require('express');
const path = require('path');
const PORT = 3001;
const app = express();
const fs = require('fs');
// Import api route file
const api = require('./routes/index.js');
// Adding path for http://localhost:3001/api 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

//  GET function for main screen http://localhost:3001
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
//  GET function for http://localhost:3001/notes end
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// server listenner when user trying to get http://localhost:3001 
app.listen(PORT, () =>
    console.log(`app listennig : http://localhost:${PORT}`));