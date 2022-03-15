const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import Likes model from models
const { Likes } = require('../models')
const { validateToken } = require('../middleware/AuthMiddleware')

router.post('/', validateToken, async (req, res) => {
    // get Post Id from request body
    const { PostId } = req.body
    // get User Id from validate token
    const userId = req.user.id

    // find one likes where postid and userid
    const found = await Likes.findOne({where: {PostId: PostId, UserId: userId}})

    // if likes not found
    if (!found) {
        try {
            // add likes
            await Likes.create({ PostId: PostId, UserId: userId })
            res.status(201).json({liked: true})
        } catch (err) {
            res.status(500)
        }
    } else {
        try {
            // destroy, delete multiple instance
            await Likes.destroy({ where: { PostId: PostId, UserId: userId } })
            res.status(200).json({liked: false})
        } catch (err) {
            res.status(500)
        }
    }


})

module.exports = router