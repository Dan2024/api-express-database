const db = require("../../db");

const getPets = (req) => {
  const { sqlString, values } = _createSqlString(req);
  return db.query(sqlString, values);
};

function _createSqlString(req) {
  const typeReq = req.query.type;
  const microchip = req.query.microchip;

  let sqlString = `SELECT * FROM "pets" `;
  let perPage = req.query.per_page;
  let page = req.query.page;
  let values = [];

  if (perPage >= 10 && perPage <= 50) values.push(+perPage);
  if (perPage < 10 && perPage > 0) values.push(10);
  if (perPage > 50) values.push(50);
  if (perPage === undefined) values.push(20);

  if (page === undefined || page === "1") values.push(0);
  else values.push(page * values[0]);

  if (typeReq && microchip !== undefined) {
    values = [...values, typeReq, microchip];
    sqlString += ` WHERE type = $3 AND microchip = $4`;
  } else if (typeReq) {
    values = [...values, typeReq];
    sqlString += ` WHERE type = $3`;
  } else if (microchip !== undefined) {
    values = [...values, microchip];
    sqlString += ` WHERE microchip = $3`;
  }

  sqlString += ` LIMIT $1 OFFSET $2;`;

  return { sqlString, values };
}

const getPetById = (req) => {
  const id = [req.params.id];

  return db.query(`SELECT * FROM pets WHERE id = $1;`, id);
};

const addNewPet = (req) => {
  const values = [
    req.body.name,
    req.body.age,
    req.body.type,
    req.body.breed,
    req.body.microchip,
  ];

  return db.query(
    `INSERT INTO pets (name, age, type, breed, microchip) VALUES ($1, $2, $3, $4, $5) returning * ;`,
    values
  );
};

const updatePet = async (req) => {
  const values = [
    req.body.name,
    req.body.age,
    req.body.type,
    req.body.breed,
    req.body.microchip,
    req.params.id,
  ];

  return db.query(
    `UPDATE "pets" SET name = $1, age = $2, type = $3, breed = $4, microchip = $5 WHERE id = $6 returning *;`,
    values
  );
};

const deletePet = async (req) => {
  const id = [req.params.id];

  return db.query(`DELETE FROM "pets" WHERE id = $1 returning *;`, id);
};

module.exports = {
  getPets,
  getPetById,
  addNewPet,
  updatePet,
  deletePet,
};
