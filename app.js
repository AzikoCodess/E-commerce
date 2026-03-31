require("dotenv").config()
const express = require("express")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(express.json())

app.use("/products", productRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.BASE_URL}`)
})

