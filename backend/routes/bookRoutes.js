const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// POST - Add a new book
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const result = await newBook.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch all books with all fields
router.get('/', async (req, res) => {
  try {
    // Fetch all books without limiting fields
    const books = await Book.find(); // This will fetch all fields by default
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update a book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Bestsellers
router.get('/bestsellers', async (req, res) => {
  try {
    // Fetch bestsellers with all fields
    const bestsellers = await Book.find({ isBestseller: true });
    res.json(bestsellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Search books
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { publisher: { $regex: query, $options: 'i' } }
      ]
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
