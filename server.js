const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('api/notes', (req, res) => {
    res.json(notes.slice(1))
});

const createNote = (body, createdNotes) => {
    const note = body;
    
}

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'))
// });

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});