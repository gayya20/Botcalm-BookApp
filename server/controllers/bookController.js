const Book = require('../models/Books');

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.userId });
    console.log(req.user.userId)
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;
  console.log(req.user.userId); // This should log the verified user object


  const book = new Book({
    title,
    author,
    genre,
    publicationDate,
    userId: req.user.userId,
  });

  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
