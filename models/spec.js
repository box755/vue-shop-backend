module.exports = (sequelize, Sequelize) => {
    const Spec = sequelize.define('spec', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false, // 規格名稱，如 "尺寸"、"顏色"
        }
    });

    return Spec;
};
