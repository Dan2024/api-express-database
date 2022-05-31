const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET requests
router.get("/", async (req, res) => {
  const typeReq = req.query.type;
  const microchip = req.query.microchip;

  let page = req.query.page;
  let perPage = req.query.per_page;

  page = page === undefined || page === "1" ? "" : "OFFSET " + page * perPage;

  perPage = perPage === undefined ? "LIMIT 20" : "LIMIT " + perPage;
  if (perPage > 50) perPage = 50;

  let sqlString = `SELECT * FROM "pets" ${page} ${perPage}`;

  if (typeReq && microchip !== undefined) {
    sqlString += ` WHERE type = '${typeReq}' AND microchip = '${microchip}';`;
  } else if (typeReq) {
    sqlString += ` WHERE type = '${typeReq}';`;
  } else if (microchip !== undefined) {
    sqlString += ` WHERE microchip = '${microchip}';`;
  }

  const result = await db.query(sqlString);

  res.json({ pets: result.rows });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await db.query(`SELECT * FROM pets WHERE id = ${id};`);
  const pet = result.rows[0];

  res.json({ pet: pet });
});

// POST requests
router.post("/", async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;

  const result = await db.query(
    `INSERT INTO pets (name, age, type, breed, microchip) VALUES ('${name}', '${age}', '${type}', '${breed}', '${microchip}') returning * ;`
  );

  res.json({ pet: result.rows[0] });
});

module.exports = router;
