const petsRepository = require("../repositories/petsRepository");

const getPets = async (req, res) => {
  return petsRepository
    .getPets(req, res) // why req and res here ?
    .then((petsObj) => res.json({ pets: petsObj.rows }));
};

const getPetById = async (req, res) => {
  return petsRepository
    .getPetById(req, res)
    .then((petsObj) => res.json({ pets: petsObj.rows[0] }));
};

const addNewPet = async (req, res) => {
  return petsRepository
    .addNewPet(req, res)
    .then((petsObj) => res.json({ pets: petsObj.rows[0] }));
};

const updatePet = async (req, res) => {
  return petsRepository
    .updatePet(req, res)
    .then((petsObj) => res.json({ pet: petsObj.rows[0] }));
};

const deletePet = async (req, res) => {
  return petsRepository
    .deletePet(req, res)
    .then((petsObj) => res.json({ pet: petsObj.rows[0] }));
};

// delete and get can be genralised others cant bc unique bodies

module.exports = {
  getPets,
  getPetById,
  addNewPet,
  updatePet,
  deletePet,
};
