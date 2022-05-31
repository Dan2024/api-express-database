const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET requests
router.get("/", async (req, res) => {
  const typeReq = req.query.type;
  let sqlString = 'SELECT * FROM "pets"';

  if (typeReq) sqlString += ` WHERE type = '${typeReq}';`;

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
