const pool = require("../data/db");

module.exports = {
    async createUser(user){
        return await pool.query(`INSERT INTO users SET ?`, [user]);
    },
    async selectUserByName(username){
        return await pool.query(`SELECT * FROM users WHERE username = ?`, [username]);
    },
    async selectUserById(id){
        return await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    }
}