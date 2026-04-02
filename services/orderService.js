const db = require("../db")

const createOrder = (user_id, product_id, quantity) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO orders (user_id, product_id, quantity)
        VALUES (?, ?, ?)
        `
        db.run(sql, [user_id, product_id, quantity], function (err) {
            err ? reject(err) : resolve(this.lastID)
        })
    })
}

const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                orders.id,
                users.name as user_name,
                products.title as product_title,
                orders.quantity
            FROM orders
            JOIN users ON orders.user_id = users.id
            JOIN products ON orders.product_id = products.id
        `
        db.all(sql, [], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

const getMyOrders = (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                orders.id,
                products.title,
                orders.quantity
            FROM orders
            JOIN products ON orders.product_id = products.id
            WHERE orders.user_id = ?
        `

        db.all(sql, [user_id], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

module.exports = {
    createOrder,
    getAllOrders,
    getMyOrders
}