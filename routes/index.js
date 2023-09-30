const router = require('express').Router()

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World')
})

router.use('/personnel', require('./personnel'))
router.use("/company", require("./company"))

module.exports = router