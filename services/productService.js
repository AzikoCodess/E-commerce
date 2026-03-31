const db = require("../db")

const createProduct = (title, price, category) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO products (title, price, category) VALUES (?, ?, ?)`

        db.run(sql, [title, price, category], function (err) {
            if (err) reject(err)
            else resolve(this.lastID)
        })
    })
}

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM products`

        db.all(sql, [], (err, rows) => {
            if (err) reject(err)
            else resolve(rows)
        })
    })
}

const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM products WHERE id = ?`

        db.get(sql, [id], (err, row) => {
            err ? reject(err) : resolve(row)
        })
    })
}

const updateProduct = (id, title, price, category) => {
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE products
        SET title=?, price=?, category=?
        WHERE id=?
        `
        db.run(sql, [title, price, category, id], function (err) {
            err ? reject(err) : resolve(this.changes)
        })
    })
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM products WHERE id=?`

        db.run(sql, [id], function (err) {
            err ? reject(err) : resolve(this.changes)
        })
    })
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}