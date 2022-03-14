const { verify } = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")

    // check if the user trying to make comment without logging in
    if (!accessToken) {
        return res.status(401).json({ error: "User not logged in!" })
    }

    try {
        const validToken = verify(accessToken, "importantsecret")
        req.user = validToken

        if (validToken) {
            // move forward with the request
            return next()
        }
    } catch (err) {
        return res.status(403).json({ error: err })
    }
}

module.exports = { validateToken }