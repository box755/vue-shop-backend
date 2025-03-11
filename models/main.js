
// 資料庫ORM，把資料庫對象化
const Sequelize = require('sequelize')
const dbConfig = require('../config/dbConfig.js')



// console.log(dbConfig)
// 建立sequelize對資料庫的連接
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    pool: {
        min: dbConfig.pool.min,
        max: dbConfig.pool.max,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
})

const db ={}

db.sequelize = sequelize
db.Sequelize = Sequelize

// 回傳一個sequelize對象，可以操作post表
db.Post = require('./post.js')(sequelize, Sequelize)
db.Category = require('./category.js')(sequelize, Sequelize)
db.Product = require('./product.js')(sequelize, Sequelize)

// 設定關聯
db.Category.hasMany(db.Product, { foreignKey: 'categoryId', as: 'goods' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = db

