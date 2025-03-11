//手動設定路徑導入環境變數
require('dotenv').config({path: '../.env'})
// 資料庫設定檔
module.exports = {

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_MYSQL_DB,
    pool: {
        min: parseInt(process.env.DB_POOL_MIN),
        max: parseInt(process.env.DB_POOL_MAX),
        idleTimeout: parseInt(process.env.DB_POOL_IDLE),
        acquireTimeout: parseInt(process.env.DB_POOL_ACQUIRE),
    }

}

//
// module.exports = {
//
//     host: 'localhost',
//     user: 'host',
//     password: 'kk865610',
//     dialect: 'mysql',
//     database: 'myvueshop2',
//     pool: {
//         min: 0,
//         max: 5,
//         idleTimeout: 50000,
//         acquireTimeout: 30000,
//     }
//
// }
