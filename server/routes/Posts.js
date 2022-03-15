const express = require('express')
// Router() method creates a new router object
const router = express.Router()
// import Posts and Likes model from models
const { Posts, Likes } = require('../models')

const { validateToken } = require('../middleware/AuthMiddleware')

// GET posts method
router.get('/', async (req, res) => {
    try {
        // findAll, search for multiple instances, includes likes
        const listOfPosts = await Posts.findAll({include: [Likes]})
        // if data found
        if (listOfPosts.length > 0) {
            // send status OK, send posts data
            res.status(200).json(listOfPosts)
        } else {
            // send status no content, data not found
            res.status(204).json("Data not found...")
        }
    } catch (err) {
        res.status(500)
    }
})

// GET Single Post method
router.get('/single/:id', async (req, res) => {
    // get id from params
    const id = req.params.id

    try {
        // findByPk, find Posts data with primary key id
        const post = await Posts.findByPk(id)
        // send status OK, send post data
        res.status(200).json(post)
    } catch (err) {
        res.status(500)
    }
})

// router.get('/singleUser/:id', async (req, res) => {
//     const id = req.params.id

//     try {
//         const listPosts = await Posts.findAll({ where: {  } })
//         res.status(200).json(post)
//     } catch (err) {
//         res.status(500)
//     }
// })

// POST method
router.post('/', validateToken, async (req, res) => {
    // get post from request body
    const post = req.body
    // change post username with username from validate token user
    post.username = req.user.username

    try {
        // create() method builds a new model instance and calls save on it
        await Posts.create(post)
        // send status CREATED, send post data
        res.status(201).json(post)
    } catch (err) {
        res.status(500)
    }
})

// UPDATE title method
router.put('/title', validateToken, async (req, res) => {
    // get title and post id from request body
    const { newTitle, id } = req.body

    try {
        await Posts.update({title: newTitle}, {where: {id: id}})
        // send status ok
        res.status(200).json("Title updated.")
    } catch (err) {
        res.status(500)
    }
})

// UPDATE body method
router.put('/postText', validateToken, async (req, res) => {
    // get post text and post id from request body
    const { newPostText, id } = req.body

    try {
        await Posts.update({postText: newPostText}, {where: {id: id}})
        // send status ok
        res.status(200).json("Post text updated.")
    } catch (err) {
        res.status(500)
    }
})

module.exports = router