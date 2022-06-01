const db = require("../../db");

const getAllBooks = (req) => {
  const topicReq = req.query.topic;
  const typeReq = req.query.type;
  let sqlString = 'SELECT * FROM "books"';
  let values;

  if (typeReq && topicReq) {
    values = [typeReq, topicReq];
    sqlString += ` WHERE type = $1 AND topic = $2`;
  } else if (typeReq) {
    values = [typeReq];
    sqlString += ` WHERE type = $1`;
  } else if (topicReq) {
    values = [topicReq];
    sqlString += ` WHERE topic = $1`;
  }
  sqlString += ` ORDER BY id ;`;

  return db.query(sqlString, values); // returns object with rows key containing books
};

const getBookById = (req) => {
  const id = [req.params.id];

  return db.query(`SELECT * FROM "books" WHERE id = $1;`, id);
};

const addNewBook = (req) => {
  const values = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    req.body.publicationDate,
    req.body.pages,
  ];

  return db.query(
    `INSERT INTO "books" (title, type, author, topic, publicationDate, pages) VALUES ($1, $2, $3, $4, $5, $6) returning *;`,
    values
  );
};

const updateBook = async (req) => {
  const values = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    req.body.publicationDate,
    req.body.pages,
    req.params.id,
  ];

  return db.query(
    `UPDATE "books" SET title = $1, type = $2, author = $3, topic = $4, publicationDate = $5, pages = $6 WHERE id = $7 returning *;`,
    values
  );
};

const deleteBook = async (req) => {
  const id = [req.params.id];

  return db.query(`DELETE FROM "books" WHERE id = $1 returning *;`, id);
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
