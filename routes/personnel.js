const express = require("express")
const router = new express.Router()

const personnelController = require("../controllers/personnel")
const validation = require("../utilities/personnelValidation")

router.get("/", personnelController.getAll)
router.get("/:id", personnelController.getSingle)
router.post("/", validation.savePersonnel, personnelController.addPersonnel)
router.put("/:id", validation.savePersonnel, personnelController.updatePersonnel)
router.delete("/:id", personnelController.deletePersonnel)

module.exports = router