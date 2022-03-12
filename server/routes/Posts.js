const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import Posts model from models
const { Posts } = require('../models')

// GET method
router.get('/', async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll()
        if (listOfPosts.length > 0) {
            res.status(200).json(listOfPosts)
        } else {
            res.status(204).json("Data not found...")
        }
    } catch (err) {
        res.status(500)
    }
})

// POST method
router.post('/', async (req, res) => {
    const post = req.body

    try {
        // create() method builds a new model instance and calls save on it
        await Posts.create(post)

        res.status(201).json(post)
    } catch (err) {
        res.status(500)
    }
})

module.exports = router