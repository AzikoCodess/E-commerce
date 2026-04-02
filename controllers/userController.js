require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userService = require("../services/userService")

const register = async (req, res) => {
    try {
        const { name, password } = req.body

        if (!name || !password) {
            return res.status(400).json({ message: "name va password bo'lishi shart!" })
        }

        const oldUser = await userService.findUserByName(name)
        if (oldUser) {
            return res.status(400).json({ message: "Bunday user allaqachon mavjud" })
        }

        const hash = await bcrypt.hash(password, 10)
        const id = await userService.createUser(name, hash)

        res.status(201).json({
            message: "User created",
            id, name
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { name, password } = req.body
        if (!name || !password) {
            return res.status(400).json({ message: "name va password bo'lishi shart!" })
        }

        const user = await userService.findUserByName(name)
        if (!user) {
            return res.status(404).json({ message: "Bunday user topilmadi" })
        }

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) {
            return res.status(401).json({ message: "Parol xato" })
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1d" })

        res.status(200).json({
            token
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const profile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User topilmadi" })
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const allUsers = async (req, res) => {
    try {
        const users = await userService.allUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = {
    register,
    login,
    profile,
    allUsers
}