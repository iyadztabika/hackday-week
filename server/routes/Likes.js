const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import Likes model from models
const { Likes } = require('../models')
const { validateToken } = require('../middleware/AuthMiddleware')

router.post('/', validateToken, async (req, res) => {
    const { PostId } = req.body
    const userId = req.user.id

    const found = await Likes.findOne({where: {PostId: PostId, UserId: userId}})

    if (!found) {
        try {
            await Likes.create({ PostId: PostId, UserId: userId })
            res.status(201).json('Likes added.')
        } catch (err) {
            res.status(500)
        }
    } else {
        try {
            await Likes.destroy({ where: { PostId: PostId, UserId: userId } })
            res.status(200).json('Likes deleted.')
        } catch (err) {
            res.status(500)
        }
    }


})

module.exports = router