const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/create", authMiddleware, orderController.createOrder)
router.get("/all", orderController.getAllOrders)
router.get("/my", authMiddleware, orderController.getMyOrders)

module.exports = router