const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import comments model from models
const { Comments } = require('../models')
const { validateToken } = require('../middleware/AuthMiddleware')

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
router.post('/', validateToken, async (req, res) => {
    const comment = req.body
    const username = req.user.username
    comment.username = username

    try {
        await Comments.create(comment)
        res.status(201).json(comment)
    } catch (err) {
        res.status(500)
    }

})

module.exports = router