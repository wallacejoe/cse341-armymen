const validator = require("./validator")

const savePersonnel = (req, res, next) => {
    const validationRule = {
        firstName:"required|string",
        lastName:"required|string",
        email:"required|email",
        birthday:"required|string",
        rank:"required|string",
        company:"required|string",
        dateOfDeployment:"required|string"
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

module.exports = {savePersonnel}