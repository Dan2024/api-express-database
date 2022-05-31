const express = require("express");
const router = express.Router();
const bookController = require("../controllers/booksController");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.addNewBook);

module.exports = router;
