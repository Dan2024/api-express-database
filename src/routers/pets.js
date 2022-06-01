const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController");
// const { body, validationResult } = require("express-validator");

router.get("/", petsController.getPets);
router.get("/:id", petsController.getPetById);
router.post("/", petsController.addNewPet);
router.put("/:id", petsController.updatePet);
router.delete("/:id", petsController.deletePet);

module.exports = router;
