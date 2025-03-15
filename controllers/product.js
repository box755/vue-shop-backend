const db = require('../models/main.js');
const Product = db.Product;

exports.getHotProducts = async (req, res) => {
    try {
        // 查詢4項商品作為熱門商品
        const products = await Product.findAll({
            limit: 4,
            offset:0,
        });

        // 格式化數據
        const response = {
            code: "1",
            msg: "操作成功",
            result: products.map(product => formatHotProduct(product))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: "0", msg: "系統錯誤" });
    }
};


exports.getNewProducts = async (req, res) => {
    try {
        // 查詢第4項至第5項商品作為最新商品
        const products = await Product.findAll({
            limit: 4,
            offset:4
        });

        // 格式化數據
        const response = {
            code: "1",
            msg: "操作成功",
            result: products.map(product => formatNewProduct(product))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: "0", msg: "系統錯誤" });
    }
};


function formatNewProduct(product) {
    return {
        id: product.id,
        name: product.name,
        desc: product.desc,
        price: product.price,
        picture: product.picture,
        orderNum: product.orderNum,
    };
}

function formatHotProduct(product) {
    return {
        id: product.id,
        picture: product.picture,
        title: product.name,
        alt: product.desc || "No description available" // 如果沒有描述，則給預設值
    };
}
