const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import Users model from models
const { Users } = require('../models')
// import bcrypt
const bycrpt = require('bcrypt')

const { validateToken } = require('../middleware/AuthMiddleware')

const { sign } = require('jsonwebtoken')


// POST registration method
router.post('/', async (req, res) => {
    // get username and password from the request body
    const { username, password } = req.body

    // findOne, search for a single instance, returns the first instance found, or null if none can be found
    const user = await Users.findOne({ where: { username: username }})

    // if user found, send status 409
    if (user) {
        res.status(409).json({ error: "User Does Exist" })
    } else {
        bycrpt
            // hash password, a scrambled representation of itself
            .hash(password, 10)
            .then(hash => {
                // build a new model instance and calls save on it
                Users.create({
                    username,
                    password: hash
                })
                res.status(201).json("User Created.")
            })
            .catch(err => {
                console.log(err)
            })
    }

})

// POST login method
router.post('/login', async (req, res) => {
    // get username and password from the request body
    const { username, password } = req.body

    // findOne, search for a single instance, returns the first instance found, or null if none can be found
    const user = await Users.findOne({ where: { username: username }})

    // if user not found, send status 404
    if (!user) {
        res.status(404).json({ error: "User Doesn't Exist" })
    } else {
        bycrpt
            // to check password
            .compare(password, user.password)
            .then(match => {
                // if password not match, return 403 forbidden, we have no permission
                if (!match) {
                    res.status(403).json({ error: "Wrong username and password combination!" })
                }
    
                // put the username and id as the access token
                const accessToken = sign({ username: user.username, id: user.id }, "importantsecret")
    
                // send status OK
                res.status(200).json({token: accessToken, username, id: user.id})
            })
            .catch(err => {
                console.log(err)
            })
    }


})

// check if the token is valid or not
router.get('/token', validateToken, (req, res) => {
    res.json(req.user)
})

// get profile info
router.get('/profileInfo/:name', async (req, res) => {
    // get id from the params
    const name = req.params.name
    console.log(name)

    try {
        // find by primary key from Users table, exculde password
        const profileInfo = await Users.findOne({ where: { username: name }}, {
            attributes: { exclude: ["password"] }
        })
        // send status OK and the profile info data
        res.status(200).json(profileInfo)
    } catch (err) {
        // send status NOT FOUND
        res.status(404).json("Profile not found.")
    }

})

module.exports = router