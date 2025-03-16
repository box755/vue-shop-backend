module.exports = (sequelize, Sequelize) => {
    const SKU = sequelize.define('sku', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        skuCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        oldPrice: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        inventory: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 0, // 預設庫存為 0
        },
        picture: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'products', // 關聯 `Product` 表
                key: 'id',
            },
            onDelete: 'CASCADE',
        }
    });

    return SKU;
};
