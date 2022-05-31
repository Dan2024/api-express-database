const db = require("../../db");

const getPets = (req, res) => {
  const typeReq = req.query.type;
  const microchip = req.query.microchip;

  let sqlString = `SELECT * FROM "pets" `;
  let perPage = req.query.per_page;
  let page = req.query.page;

  if (perPage < 10 && perPage > 0) perPage = 10;
  if (perPage > 50) perPage = 50;
  if (perPage >= 10 && perPage <= 50) perPage = perPage;
  else perPage = 20;

  page = page === undefined || page === "1" ? "" : "OFFSET " + page * perPage;
  // console.log(page); // doesnt show as undefined?

  if (typeReq && microchip !== undefined) {
    sqlString += ` WHERE type = '${typeReq}' AND microchip = '${microchip}'`;
  } else if (typeReq) {
    sqlString += ` WHERE type = '${typeReq}'`;
  } else if (microchip !== undefined) {
    sqlString += ` WHERE microchip = '${microchip}'`;
  }
  sqlString += ` LIMIT ${perPage} ${page};`; // has to be at end?

  return db.query(sqlString);
};

const getPetById = (req, res) => {
  const id = req.params.id;

  return db.query(`SELECT * FROM pets WHERE id = ${id};`);
};

const addNewPet = (req, res) => {
  const { name, age, type, breed, microchip } = req.body;

  return db.query(
    `INSERT INTO pets (name, age, type, breed, microchip) VALUES ('${name}', ${age}, '${type}', '${breed}', ${microchip}) returning * ;`
  );
};

module.exports = {
  getPets,
  getPetById,
  addNewPet,
};
