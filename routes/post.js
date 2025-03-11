const { create, findAllPosts, findOnePost, findPostById } = require('../controllers/post');
const express = require("express");


// 使用路由，就像開啟一扇門讓請求進來
const router = express.Router();

module.exports = (app) => {

    // 將req res交給create方法處理，promise
    router.post('/create', create)
    router.get('/findAllPosts', findAllPosts)
    router.get('/findOnePost', findOnePost)
    router.get('/findPostById', findPostById)




    app.use('/api/posts/', router)

}


