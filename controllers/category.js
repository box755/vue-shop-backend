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

    exports.getCategoryById = async (req, res) => {
    try {
        // 根據id查詢分類，且此分類必須有parentId
            if(!req.query.id){
                return res.status(404).json({ code: "0", msg: "未輸入分類id" });

            }
        const category = await Category.findOne({
            where: { id: req.query.id },
            include: [{ model: Category, as: 'parent' }]
        });

        if (!category) {
            return res.status(404).json({ code: "0", msg: "分類不存在" });
        }

        if (!category.parentId) {
            return res.status(400).json({ code: "0", msg: "此分類沒有上層分類" });
        }

        const response = {
            code: "1",
            msg: "操作成功",
            result: {
                id: category.id,
                name: category.name,
                picture: category.picture,
                parentId: category.parentId,
                parentName: category.parent ? category.parent.name : null,
            }
        };

        res.status(200).json(response);


    } catch (error) {
        console.error(error);
        res.status(500).json({ code: "0", msg: "系統錯誤" });
    }
}


exports.getCategoryWithChildren = async (req, res) => {
    try {
        const categoryId = req.query.id;
        if(!categoryId){
            return res.status(404).json({ code: "0", msg: "未輸入分類id" });

        }
        // 查找該分類，確保它是頂層分類
        const category = await Category.findOne({
            where: { id: categoryId, parentId: null }
        });

        if (!category) {
            return res.status(404).json({ code: "0", msg: "分類不存在或不是頂層分類" });
        }

        // 查找該分類的子分類
        const children = await Category.findAll({
            where: { parentId: categoryId },
            include: [
                {
                    model: Product,
                    as: 'goods',
                    order: [['orderNum', 'DESC']] // 商品按熱度排序
                }
            ]
        });

        // 返回格式化的數據
        const response = {
            code: "1",
            msg: "操作成功",
            result: {
                id: category.id,
                name: category.name,
                picture: category.picture,
                children: children.map(child => formatChildCategory(child))
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: "0", msg: "系統錯誤" });
    }
};

function formatChildCategory(child) {
    return {
        id: child.id,
        name: child.name,
        picture: child.picture,
        parentId: null,  // 因為是直接的子分類，所以 `parentId` 不返回
        parentName: null,
        goods: child.goods.length > 0 ? child.goods.map(good => formatProduct(good)) : null,
        categories: null,
        brands: null,
        saleProperties: null
    };
}

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
