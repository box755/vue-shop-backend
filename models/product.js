// product表ORM，建立表映射物件
module.exports = (sequelize, Sequelize) => {
    //回傳對象
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        picture: {
            type: Sequelize.STRING,
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        orderNum:{
            type: Sequelize.STRING,
        },

        discount: {
            type: Sequelize.STRING,
        },

        // 外鍵
        categoryId: {
            type: Sequelize.STRING,
            allowNull: false, // 設定為必填，確保每個產品都有分類
            references: {
                model: 'categories', // 這裡要對應 `Category` 表
                key: 'id',
            },
            onDelete: 'CASCADE', // 當分類刪除時，對應產品也刪除
        },
    })

    return Product
}
