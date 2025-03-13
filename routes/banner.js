const { getBanners } = require('../controllers/banner');
const express = require("express");


const router = express.Router();

module.exports = (app) => {

    router.get('/getBanners', getBanners)




    app.use('/api/banners/', router)

}


