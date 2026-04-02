require("dotenv").config()
const express = require("express")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()

app.use(express.json())


app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.BASE_URL}`)
})

