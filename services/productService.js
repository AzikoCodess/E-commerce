const db = require("../db")

const createProduct = (title, price, category) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO products (title, price, category) VALUES (?, ?, ?)`

        db.run(sql, [])
    })
}