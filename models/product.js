// product表ORM，建立表映射物件
module.exports = (sequelize, Sequelize) => {
    //回傳對象
    const Category = sequelize.define('product', {
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
        }
    })

    // 遞回關係：category有多個category作為子表
    // category有多個category作為父表 並且都是以parentId關聯彼此

    return Category
}
