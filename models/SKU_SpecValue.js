module.exports = (sequelize, Sequelize) => {
    const SKU_SpecValue = sequelize.define('sku_spec_value', {
        skuId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'skus', // 關聯到 `SKU` 表
                key: 'id',
            },
        },
        specValueId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'spec_values', // 關聯到 `SpecValue` 表
                key: 'id',
            },
        }
    });

    return SKU_SpecValue;
};
