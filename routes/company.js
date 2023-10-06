const express = require("express")
const router = new express.Router()

const companyController = require("../controllers/company")
const validation = require("../utilities/companyValidation")
const {isAuthenticated} = require("../utilities/authenticate")

router.get("/", companyController.getAll)
router.get("/:id", companyController.getSingle)
router.post("/", isAuthenticated, validation.saveCompany, companyController.addCompany)
router.put("/:id", isAuthenticated, validation.saveCompany, companyController.updateCompany)
router.delete("/:id", isAuthenticated, companyController.deleteCompany)

module.exports = router