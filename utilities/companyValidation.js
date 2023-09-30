const validator = require("./validator")

const saveCompany = (req, res, next) => {
    const validationRule = {
        companyName:"required|string",
        demployment:"string",
        location:"string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            })
        } else {
            next()
        }
    })
}

module.exports = {saveCompany}