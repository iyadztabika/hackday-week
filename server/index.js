const express = require('express')
const app = express()
const cors = require('cors')

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

db.sequelize
    // sync the model to the db, that is create the table
    .sync()
    .then(() => {
        // listen for connections on the specified port
        app.listen(5000, () => {
            console.log("Server running on port: 5000")
        })
    })
