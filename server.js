const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //


// START ROUTES //

// find   - finds everything

// .find()
app.get('/books', async (req, res) => {
    try {
      const everythingBooks = await Book.find();
      res.json(everythingBooks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

 
// findById
app.get('/books/:bookId', async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(book);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// insertMany
app.post('/books', async (req, res) => {
    try {
      const books = req.body.books; // Array of book objects
      const dbResponse = await Book.insertMany(books);
      res.status(201).json(dbResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

// findOne
app.get('/books/title/:title', async (req, res) => {
    try {
      const title = req.params.title;
      const book = await Book.findOne({ title });
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(book);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

  
// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


