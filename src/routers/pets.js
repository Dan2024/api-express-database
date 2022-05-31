const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController");

router.get("/", petsController.getPets);
router.get("/:id", petsController.getPetById);
router.post("/", petsController.addNewPet);

module.exports = router;
