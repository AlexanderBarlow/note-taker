const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');
const uuid = require('./public/assets/js/uuid')

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    res.json(notes);
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


//Above code comes from directions within GitLab
//TODO: Code from class examples
app.post('/api/notes', (req,res) => {

const { title, note } = req.body;

if(title && note) {
    const newNote = {
        title,
        note,
        id: uuid(),
    };
    console.log(newNote);

    const newNotes = (newNote);

    fs.readFile(`./db/db.json`, ('utf8'), (err,data) => {
        if(err) {
            console.log(err);
        }else {
            const note = JSON.parse(data);

            note.push(newNotes);

            fs.writeFile(`./db/db.json`, JSON.stringify(note, null, 4), (writeErr) => 
                writeErr 
                ? console.log(writeErr)
                : console.log(`New note has been made.`)
            );
        };
    });
   
    const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
}else {
    res.status(500).json('Error in saving note')
};
});
//TODO: Code from class examples



// TODO: THE CODE BELOW HAS THE APPLICATION FUNCTIONING
// const createNote = (body, createdNotes) => {

//     const note = body;

//     if (!Array.isArray(createdNotes))
//         createdNotes = [];
    
//     if (createdNotes.length === 0)
//         createdNotes.push(0);

//     body.id = createdNotes[0];
//     createdNotes[0]++;

//     createdNotes.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(createdNotes, null, 2)
//     );
//     return note;
// }

// app.post('/api/notes', (req, res) => {
//     const note = createNote(req.body, notes);
//     res.json(note);
// });
//TODO: END OF FUNCTION CODE

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});