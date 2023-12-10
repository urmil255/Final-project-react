const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Add any API routes or other routes here

// For all other routes, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://utrivedi330:xzujw1smgsvhgiIv@clusterkeeper.58hhgel.mongodb.net/';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const cors = require('cors');

// ...

app.use(cors({
  origin: 'https://immense-tor-66429-7b1067da5daf.herokuapp.com', // or '*' to allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Rest of your server code

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://utrivedi330:xzujw1smgsvhgiIv@clusterkeeper.58hhgel.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define routes here (Create, Read, Update, Delete)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Add these lines to your server.js file

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: String, // Add this field to associate notes with users
  title: String,
  content: String,
});


const Note = mongoose.model('Note', noteSchema);



// CRUD routes

// Create
app.post('/notes', (req, res) => {
  const newNote = new Note({
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
  });

  newNote.save()
    .then(note => {
      console.log('Note added:', note);
      res.json(note);
    })
    .catch(err => {
      console.error('Error saving note:', err);
      res.status(400).send('Unable to save note to database');
    });
});



// Read
app.get('/notes', async (req, res) => {
  try {
    // Ensure that the user is logged in
    if (!req.query.userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const notes = await Note.find({ userId: req.query.userId });
    console.log('Notes fetched:', notes);
    res.json(notes);
  } catch (error) {
    console.error('Error retrieving notes:', error);
    res.status(500).send('Error retrieving notes from database');
  }
});


  

app.put('/notes/:id', (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (!note)
      res.status(404).send('Data is not found');
    else {
      note.title = req.body.title;
      note.content = req.body.content;

      note.save()
        .then(note => {
          res.json('Note updated');
        })
        .catch(err => {
          res.status(400).send('Update not possible');
        });
    }
  });
});

// Delete
// Modify the existing delete route to handle both individual note deletion and clearing all notes
// Modify the existing delete route to handle both individual note deletion and clearing all notes
app.delete('/notes/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // Delete an individual note
      const deletedNote = await Note.findOneAndDelete({ _id: req.params.id });

      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }

      res.status(200).json({ message: 'Note deleted successfully' });
    } else {
      // Clear all notes
      await Note.deleteMany({});
      res.status(200).json({ message: 'All notes cleared successfully' });
    }
  } catch (error) {
    console.error('Error deleting notes:', error);
    res.status(500).json({ error: 'Error deleting notes from the database' });
  }
});


