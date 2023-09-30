const express = require("express")
const router = new express.Router()

const companyController = require("../controllers/company")
const validation = require("../utilities/companyValidation")

router.get("/", companyController.getAll)
router.get("/:id", companyController.getSingle)
router.post("/", validation.saveCompany, companyController.addCompany)
router.put("/:id", validation.saveCompany, companyController.updateCompany)
router.delete("/:id", companyController.deleteCompany)

module.exports = router