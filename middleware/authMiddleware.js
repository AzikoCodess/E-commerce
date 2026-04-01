const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    console.log("authHeader: ", authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: "Token yo'q" })
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Bearer format xato"
        })
    }

    const token = authHeader.split(" ")[1]
    console.log("token: ", token)
    // const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader
    if (!token) {
        return res.status(401).json({ message: "Token xato" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = authMiddleware
