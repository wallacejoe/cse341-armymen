const express = require("express")
const app = express()
const mongodb = require("./database/mongoData")
const bodyParser = require("body-parser")
const passport = require("passport")
const session = require("express-session")
const GitHubStrategy = require("passport-github2").Strategy
const cors = require("cors")

const port = process.env.PORT || 8080
const host = process.env.HOST || "localhost"

app
    .use(bodyParser.json())
    .use(session({
        secret: process.env.GITHUB_CLIENT_SECRET,
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader(
            'Access-Control-Allow-Origin',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        )
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        next()
    })
    .use(cors({methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]}))
    .use(cors({origin: "*"}))
    // Base Route
    .use("/", require("./routes"))

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    app.get("/", (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")})

    app.get("/github/callback", passport.authenticate("github", {
        failureRedirect: "/api-docs", session: false}),
        (req, res) => {
            req.session.user = req.user
            res.redirect("/")
        })

mongodb.initDb((err) => {
    try {
        app.listen(port, () => {
            console.log(`Listening on ${host}:${port}`)
        })
    } catch {
        console.log(err)
    }
})