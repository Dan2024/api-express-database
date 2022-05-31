const petsRepository = require("../repositories/petsRepository");

const getPets = async (req, res) => {
  return petsRepository
    .getPets(req, res) // why req and res here ?
    .then((petsObj) => res.json({ pets: petsObj.rows }));
};

const getPetById = async (req, res) => {
  return petsRepository
    .getPetById(req, res) // why req and res here ?
    .then((petsObj) => res.json({ pets: petsObj.rows[0] }));
};

const addNewPet = async (req, res) => {
  return petsRepository
    .addNewPet(req, res) // why req and res here ?
    .then((petsObj) => res.json({ pets: petsObj.rows[0] }));
};

module.exports = {
  getPets,
  getPetById,
  addNewPet,
};
