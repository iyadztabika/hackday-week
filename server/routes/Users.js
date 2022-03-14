const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import Posts model from models
const { Users } = require('../models')
const bycrpt = require('bcrypt')

const { validateToken } = require('../middleware/AuthMiddleware')

const { sign } = require('jsonwebtoken')


// POST registration method
router.post('/', async (req, res) => {
    const { username, password } = req.body

    bycrpt
        .hash(password, 10)
        .then(hash => {
            Users.create({
                username,
                password: hash
            })
            res.status(201).json("User Created.")
        })
})

// POST login method
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await Users.findOne({ where: { username: username }})

    if (!user) {
        res.status(404).json({ error: "User Doesn't Exist" })
    }

    bycrpt
        .compare(password, user.password)
        .then(match => {
            if (!match) {
                res.status(403).json({ error: "Wrong username and password combination!" })
            }

            const accessToken = sign({ username: user.username, id: user.id }, "importantsecret")

            res.status(200).json({token: accessToken, username, id: user.id})
        })

})

// check if the token is valid or not
router.get('/token', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router