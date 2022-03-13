const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import Posts model from models
const { Comments } = require('../models')

// GET comments method
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId

    try {
        const comments = await Comments.findAll({ where: { PostId: postId } })
        res.status(200).json(comments)
    } catch (err) {
        res.status(500)
    }
})

// POST comments method
router.post('/', async (req, res) => {
    const comment = req.body

    try {
        await Comments.create(comment)
        res.status(201).json(comment)
    } catch (err) {
        res.status(500)
    }

})

module.exports = router