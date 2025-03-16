module.exports = (sequelize, Sequelize) => {
    const SpecValue = sequelize.define('spec_value', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false, // 規格值，如 "紅色"、"L"
        },
        picture: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        specId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'specs', // 關聯到 `Spec` 表
                key: 'id',
            },
        }
    });

    return SpecValue;
};
