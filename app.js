// 使用環境變數
require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/main.js');


app.use(bodyParser.json());  // 解析 JSON 格式
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.APP_PORT;
app.get('/api', (req, res) => {
    const data = {
        success: true,
        message: 'Success'
    }
    res.json(data)

})


db.sequelize.sync().then(() => {
    console.log('Database synchronized!');
}).catch(error => {
    console.log(error)
})




const cors = require('cors'); // 🚀 引入 CORS 套件

// ✅ 啟用 CORS，允許前端請求後端
app.use(cors({
    origin: 'http://localhost:5173', // 允許特定前端請求
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // 允許 cookie
}));





require('./routes/post.js')(app);
require('./routes/category.js')(app);
require('./routes/banner.js')(app);








app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});
