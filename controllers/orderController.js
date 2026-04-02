const orderService = require("../services/orderService")

const createOrder = async (req, res) => {
    try {
        const { product_id, quantity } = req.body
        if (!product_id || !quantity) {
            return res.status(400).json({
                message: "product_id va quantity kerak"
            })
        }

        const user_id = req.user.id

        const id = await orderService.createOrder(
            user_id, product_id, quantity
        )

        res.status(201).json({
            message: "Order created",
            id
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const user_id = req.user.id
        const orders = await orderService.getMyOrders(user_id)
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getMyOrders
}