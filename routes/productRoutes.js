const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")

router.post("/create", productController.createProduct)
router.get("/allProducts", productController.getAllProducts)
router.get("/oneProduct/:id", productController.getProductById)
router.put("/update/:id", productController.updateProduct)
router.delete("/delete/:id", productController.deleteProduct)

module.exports = router