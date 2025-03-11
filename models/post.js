// post表ORM，建立表映射物件
module.exports = (sequelize, Sequelize) => {
    //回傳對象
    const Post = sequelize.define('post', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    })

    return Post
}
