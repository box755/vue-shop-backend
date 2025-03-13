// banner表ORM，建立表映射物件
module.exports = (sequelize, Sequelize) => {
    //回傳對象
    const Banner = sequelize.define('banner', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        imgUrl: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        categoryId: {
            type: Sequelize.STRING,
            allowNull: true,
            references: {
                model: 'categories',
                key: 'id',
            }
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 1,
        },
    }, {
        timestamps: true

    })

    return Banner
}
