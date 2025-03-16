
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
db.Banner = require('./banner.js')(sequelize, Sequelize)
db.Product = require('./product.js')(sequelize, Sequelize)
db.Brand = require('./brand.js')(sequelize, Sequelize)
db.SKU = require('./sku.js')(sequelize, Sequelize)
db.Spec = require('./spec.js')(sequelize, Sequelize)
db.SpecValue = require('./specValue.js')(sequelize, Sequelize)
db.SKU_SpecValue = require('./SKU_SpecValue.js')(sequelize, Sequelize)



// 設定關聯
db.Category.hasMany(db.Product, { foreignKey: 'categoryId', as: 'goods' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });
db.Product.belongsTo(db.Brand, { foreignKey: 'brandId', as: 'brand' });
db.Banner.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });
db.Product.hasMany(db.SKU, { foreignKey: 'productId', as: 'skus' });
// SKU 關聯 Product
db.SKU.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });

// SKU 與 SpecValue 為多對多關係，透過 SKU_SpecValue 作為關聯表
db.SKU.belongsToMany(db.SpecValue, {
    through: db.SKU_SpecValue,
    foreignKey: 'skuId',
    as: 'specValues' // 記得統一 as 的命名
});

// SpecValue 與 SKU 為多對多關係
db.SpecValue.belongsToMany(db.SKU, {
    through: db.SKU_SpecValue,
    foreignKey: 'specValueId',
    as: 'skus'
});

// SpecValue 關聯 Spec (一對多)
db.Spec.hasMany(db.SpecValue, { foreignKey: 'specId', as: 'values' });
db.SpecValue.belongsTo(db.Spec, { foreignKey: 'specId', as: 'spec' });

// 確保 SKU 也關聯 SKU_SpecValue
db.SKU.hasMany(db.SKU_SpecValue, { foreignKey: 'skuId', as: 'skuSpecValues' });
db.SKU_SpecValue.belongsTo(db.SKU, { foreignKey: 'skuId', as: 'sku' });

// 確保 SpecValue 也關聯 SKU_SpecValue
db.SpecValue.hasMany(db.SKU_SpecValue, { foreignKey: 'specValueId', as: 'skuSpecValues' });
db.SKU_SpecValue.belongsTo(db.SpecValue, { foreignKey: 'specValueId', as: 'specValue' });

module.exports = db

