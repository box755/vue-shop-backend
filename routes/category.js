const { getCategories } = require('../controllers/category');
const express = require("express");


// 使用路由，就像開啟一扇門讓請求進來
const router = express.Router();

module.exports = (app) => {

    // 將req res交給create方法處理，promise
    router.get('/getCategories', getCategories)




    app.use('/api/categories/', router)

}


