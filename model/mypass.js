const pool = require("../data/db");

module.exports = {
    async storePass(pass){
        await pool.query("INSERT INTO mypass SET ?", [pass]);
    },
    async selectPassByUser(id){
        return await pool.query("SELECT * FROM mypass WHERE id_user = ?", [id]);
    },
    async deletePass(id, id_user){
        await pool.query("DELETE FROM mypass WHERE id = ? AND id_user = ?", [id, id_user]);
    },
    async selectSinglePass(id, id_user){
        return await pool.query("SELECT * FROM mypass WHERE id = ? AND id_user = ?", [id, id_user]);
    },
    async updateSinglePass(newPass, id){
        await pool.query('UPDATE mypass set ? WHERE id = ?', [newPass, id]);
    }
}