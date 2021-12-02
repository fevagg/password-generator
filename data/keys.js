require("dotenv").config({path:"port.env"})

module.exports = {
    database:{
        host: process.env.HOST,
        port: process.env.DB_PORT,
        user: process.env.USER_DB,
        password: process.env.PASS_DB,
        database: process.env.DB_NAME
    }
}