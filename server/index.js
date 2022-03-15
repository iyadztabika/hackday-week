// import express
const express = require('express')
// import cors
const cors = require('cors')
// init express
const app = express()

// parses incoming requests with JSON payloads
app.use(express.json())
// enable all cors requests
app.use(cors())

// variable db will automatically go over every single table/model that we created
const db = require('./models')

// routers
const postRouter = require('./routes/Posts')
app.use('/posts', postRouter)
const commentsRouter = require('./routes/Comments')
app.use('/comments', commentsRouter)
const usersRouter = require('./routes/Users')
app.use('/auth', usersRouter)
const likesRouter = require('./routes/Likes')
app.use('/likes', likesRouter)

db.sequelize
    // sync the model to the db, that is create the table
    .sync()
    .then(() => {
        // listen for connections on the specified port
        app.listen(5000, () => {
            console.log("Server running on port: 5000")
        })
    })
