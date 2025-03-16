// brands表ORM，建立表映射物件
module.exports = (sequelize, Sequelize) => {
    //回傳對象
    const Brand = sequelize.define('brand', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nameEn: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        logo: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        picture: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        type: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        place: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    }
    )

    return Brand
}
