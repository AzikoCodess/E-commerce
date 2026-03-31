const serviceProduct = require("../services/productService")

const createProduct = async (req, res) => {
    try {
        const { title, price, category } = req.body

        if (!title || !price || !category) {
            return res.status(400).json({
                message: "title, price, category kerak"
            })
        }

        const id = await serviceProduct.createProduct(title, price, category)

        res.status(201).json({
            message: "product created",
            id, title, price, category
        })


    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await serviceProduct.getAllProducts()

        res.status(200).json(products)

    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await serviceProduct.getProductById(id)

        if (!product) {
            return res.status(404).json({
                message: "Product topilmadi"
            })
        }

        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, price, category } = req.body

        const changes = await serviceProduct.updateProduct(id, title, price, category)
        if (changes === 0) {
            return res.status(404).json({
                message: "product topilmadi"
            })
        }

        res.status(200).json({
            updated: changes
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const changes = await serviceProduct.deleteProduct(id)
        if (changes === 0) {
            return res.status(404).json({ message: "Product topilmadi" })
        }

        res.status(200).json({
            deleted: changes
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}