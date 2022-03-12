// import express
const express = require('express')

// init express
const app = express()

// listen for connections on the specified port
app.listen(5000, () => {
    console.log("Server running on port: 5000")
})