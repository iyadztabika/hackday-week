const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import comments model from models
const { Comments } = require('../models')
const { validateToken } = require('../middleware/AuthMiddleware')

// GET comments method
router.get('/:postId', async (req, res) => {
    // get post Id from params
    const postId = req.params.postId

    try {
        // find all comments from that post
        const comments = await Comments.findAll({ where: { PostId: postId } })
        res.status(200).json(comments)
    } catch (err) {
        res.status(500)
    }
})

// POST comments method
router.post('/', validateToken, async (req, res) => {
    // get comment data from request body
    const comment = req.body
    // get username from validate token
    const username = req.user.username
    // set comment username data
    comment.username = username

    try {
        // create comments
        await Comments.create(comment)
        res.status(201).json(comment)
    } catch (err) {
        res.status(500)
    }

})

// DELETE comments method
router.delete('/:commentId', validateToken, async (req, res) => {
    // get comment id from params
    const commentId = req.params.commentId

    try {
        // delete comment from comments table
        await Comments.destroy({where: {id: commentId}})
        res.status(200).json('Comment deleted.')
    } catch (err) {
        res.status(500)
    }

})

module.exports = router