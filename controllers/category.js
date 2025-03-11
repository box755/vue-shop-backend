const db = require('../models/main.js');
const Category = db.Category;
const Product = db.Product;

exports.getCategories = async (req, res) => {
    try {
        // 查詢所有「頂層分類」，並包含「子分類」與「商品」
        const categories = await Category.findAll({
            where: { parentId: null }, // 只查「最上層分類」
            include: [
                {
                    model: Category, // 查詢子分類
                    as: 'children',
                    include: [
                        {
                            model: Product,
                            as: 'goods'
                        }
                    ]
                },
                {
                    model: Product, // 查詢該分類的商品
                    as: 'goods'
                }
            ]
        });

        // 格式化 JSON 符合 API 輸出格式
        const response = {
            code: "1",
            msg: "操作成功",
            result: categories.map(category => formatCategory(category)) //遍歷陣列
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: "0", msg: "系統錯誤" });
    }
};


function formatCategory(category) {
    return {
        id: category.id,
        name: category.name,
        picture: category.picture,
        children: category.children ? category.children.map(child => formatCategory(child)) : null, // 遞迴處理子分類
        goods: category.goods && category.goods.length > 0 ? category.goods.map(good => formatProduct(good)) : null
    };
}


function formatProduct(product) {
    return {
        id: product.id,
        name: product.name,
        desc: product.desc,
        price: product.price,
        picture: product.picture,
        discount: null, // API 有這個欄位，但目前沒數據，回傳 `null`
        orderNum: null // API 有這個欄位，但目前沒數據，回傳 `null`
    };
}
