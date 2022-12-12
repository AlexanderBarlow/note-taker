const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('api/notes', (req, res) => {
    res.json(notes.slice(1))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

const createNote = (body, createdNotes) => {
    const note = body;
    if (!Array.isArray(createdNotes))
        createdNotes = [];
    
    if (createdNotes.length === 0)
        createdNotes.push(0);

    body.id = createdNotes[0];
    createdNotes[0]++;

    createdNotes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(createdNotes, null, 2)
    );
    return note;
}

app.post('/api/notes', (req, res) => {
    const note = createNote(req.body, notes);
    res.json(note);
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});