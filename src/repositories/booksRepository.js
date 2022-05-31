const db = require("../../db");

const getAllBooks = (req, res) => {
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

  return db.query(sqlString); // returns object with rows key containing books
};

const getBookById = (req, res) => {
  const id = req.params.id;

  return db.query(`SELECT * FROM "books" WHERE id = ${id};`);
};

const addNewBook = (req, res) => {
  const { title, type, author, topic, publicationDate, pages } = req.body;

  return db.query(
    `INSERT INTO "books" (title, type, author, topic, publicationDate, pages) VALUES
        ('${title}', '${type}', '${author}', '${topic}', '${publicationDate}', ${pages}) returning *;`
  );
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
};
