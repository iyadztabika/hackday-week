// import express
const express = require('express')

// init express
const app = express()

// variable db will automatically go over every single table/model that we created
const db = require('./models')

db.sequelize
    // sync the model to the db, that is create the table
    .sync()
    .then(() => {
        // listen for connections on the specified port
        app.listen(5000, () => {
            console.log("Server running on port: 5000")
        })
    })
