const { getHotProducts, getNewProducts } = require('../controllers/product');
const express = require("express");


// 使用路由，就像開啟一扇門讓請求進來
const router = express.Router();


module.exports = (app) => {

    router.get('/getHotProducts', getHotProducts);
    router.get('/getNewProducts', getNewProducts);

    app.use('/api/product/', router)


}
