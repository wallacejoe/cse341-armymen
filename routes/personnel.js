const express = require("express")
const router = new express.Router()

const personnelController = require("../controllers/personnel")


router.get("/", personnelController.getAll)
router.get("/:id", personnelController.getSingle)
router.post("/", personnelController.addPersonnel)
router.put("/:id", personnelController.updatePersonnel)
router.delete("/:id", personnelController.deletePersonnel)

module.exports = router