const express = require("express")
const app = express()
const mongodb = require("./database/mongoData")
const bodyParser = require("body-parser")

const port = process.env.PORT || 8080
const host = process.env.HOST || "localhost"

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Origin',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// Routes
app.use("/", require("./routes"))


mongodb.initDb((err) => {
    try {
        app.listen(port, () => {
            console.log(`Listening on ${host}:${port}`)
        })
    } catch {
        console.log(err)
    }
})