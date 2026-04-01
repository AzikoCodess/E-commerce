const db = require("../db")

const createUser = (name, password) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO users (name, password, role)
        VALUES (?, ?, ?)
        `
        db.run(sql, [name, password, "user"], function (err) {
            err ? reject(err) : resolve(this.lastID)
        })
    })
}

const findUserByName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT * FROM users WHERE name=?
        `
        db.get(sql, [name], (err, row) => {
            err ? reject(err) : resolve(row)
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, name, role FROM users WHERE id=?`

        db.get(sql, [id], (err, row) => {
            err ? reject(err) : resolve(row)
        })
    })
}

const updateUserById = (name, role, id) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE users SET name=?, role=? WHERE id=?`

        db.run(sql, [name, role, id], function (err) {
            err ? reject(err) : resolve(this.changes)
        })
    })
}

const allUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users`
        db.all(sql, [], (err, rows) => {
            err ? reject(err) : resolve(rows)
        })
    })
}

module.exports = {
    createUser,
    findUserByName,
    getUserById,
    updateUserById,
    allUsers
}