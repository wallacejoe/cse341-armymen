const express = require("express")
const router = new express.Router()

const personnelController = require("../controllers/personnel")
const validation = require("../utilities/personnelValidation")
const {isAuthenticated} = require("../utilities/authenticate")

router.get("/", personnelController.getAll)
router.get("/:id", personnelController.getSingle)
router.post("/", isAuthenticated, validation.savePersonnel, personnelController.addPersonnel)
router.put("/:id", isAuthenticated, validation.savePersonnel, personnelController.updatePersonnel)
router.delete("/:id", isAuthenticated, personnelController.deletePersonnel)

module.exports = router