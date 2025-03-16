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
            allowNull: false,
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
            allowNull: true,
        },

        discount: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        evaluateNum: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        oldPrice: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        inventory: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        mainVideos: {
            type: Sequelize.TEXT, // JSON 格式存取
            allowNull: true,
        },
        videoScale: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        mainPictures: {
            type: Sequelize.TEXT, // JSON 格式存取
            allowNull: true,
        },
        salesCount: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        commentCount: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        collectCount: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        details: {
            type: Sequelize.TEXT, // 存 JSON 格式 (包括規格、商品詳情等)
            allowNull: true,
        },
        isPreSale: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        spuCode:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        isCollect: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        // 外鍵

        brandId: {
            type: Sequelize.STRING,
            allowNull: true,
            references: {
                model: 'brands',
                key: 'id',
            },
        },
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
