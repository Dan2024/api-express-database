const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET requests
router.get("/", async (req, res) => {
  const topicReq = req.query.topic;
  const typeReq = req.query.type;
  let sqlString = 'SELECT * FROM "books"';

  if (typeReq && topicReq) {
    sqlString += ` WHERE type = '${typeReq}' AND topic = '${topicReq}';`;
  } else if (topicReq) {
    sqlString += ` WHERE topic = '${topicReq}';`;
  } else if (typeReq) {
    sqlString += ` WHERE type = '${typeReq}';`;
  }

  const result = await db.query(sqlString);

  res.json({ books: result.rows });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await db.query(`SELECT * FROM "books" WHERE id = ${id};`);
  const book = result.rows[0];

  res.json({ book: book });
});

// POST requests
router.post("/", async (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;

  const result = await db.query(
    `INSERT INTO "books" (title, type, author, topic, publicationDate, pages) VALUES
        ('${title}', '${type}', '${author}', '${topic}', '${publicationDate}', ${pages}) returning *;`
  );

  res.json({ book: result.rows[0] });
});

module.exports = router;
