const { verify } = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    // get accress token from request header
    const accessToken = req.header("accessToken")

    // if user dont have access token
    if (!accessToken) {
        // send unauthorized status
        return res.status(401).json({ error: "User not logged in!" })
    }

    try {
        // verify token
        const validToken = verify(accessToken, "importantsecret")
        // set validtoken to request user
        req.user = validToken

        // if true
        if (validToken) {
            // move forward with the request
            return next()
        }
    } catch (err) {
        // send forbidden code
        return res.status(403).json({ error: err })
    }
}

module.exports = { validateToken }