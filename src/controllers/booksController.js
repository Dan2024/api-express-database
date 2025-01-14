const booksRepository = require("../repositories/booksRepository");

const getAllBooks = async (req, res) => {
  return booksRepository
    .getAllBooks(req, res) // why req and res here ? remove res
    .then((booksObj) => res.json({ books: booksObj.rows }));
};

const getBookById = async (req, res) => {
  return booksRepository
    .getBookById(req, res)
    .then((booksObj) => res.json({ book: booksObj.rows[0] }));
};

const addNewBook = async (req, res) => {
  return booksRepository
    .addNewBook(req, res)
    .then((booksObj) => res.json({ book: booksObj.rows[0] }));
};

const updateBook = async (req, res) => {
  return booksRepository
    .updateBook(req, res)
    .then((booksObj) => res.json({ book: booksObj.rows[0] }));
};

const deleteBook = async (req, res) => {
  return booksRepository
    .deleteBook(req, res)
    .then((booksObj) => res.json({ book: booksObj.rows[0] }));
};

// turn to async function?

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
