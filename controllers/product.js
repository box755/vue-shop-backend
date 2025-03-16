const db = require('../models/main.js');
const Product = db.Product;
const Brand = db.Brand;
const Sku = db.SKU;
const Category = db.Category;

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




exports.getProductDetailById = async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id);

        // 查詢商品
        const product = await Product.findByPk(id, {
            include: [
                { model: Brand, as: 'brand' },
                {
                    model: Sku,
                    as: 'skus',
                    include: [
                        {
                            model: db.SpecValue,
                            as: 'specValues',
                            include: [{ model: db.Spec, as: 'spec' }]
                        }
                    ]
                },
                {
                    model: Category,
                    as: 'category',
                    include: [
                        { model: Category, as: 'parent' }
                    ]
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ code: "0", msg: "商品不存在" });
        }

        const response = {
            code: "1",
            msg: "操作成功",
            result: formatProductDetail(product)
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: "0", msg: "系統錯誤" });
    }
};


// 獲得頂層分類
function getTopCategory(category) {
    if (!category) return null;
    while (category.parent) {
        category = category.parent;
    }
    return category;
}



function formatProductDetail(product) {
    return {
        id: product.id,
        name: product.name,
        spuCode: product.spuCode,
        desc: product.desc,
        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        inventory: product.inventory,
        brand: product.brand ? {
            id: product.brand.id,
            name: product.brand.name,
            nameEn: product.brand.nameEn,
            logo: product.brand.logo,
            picture: product.brand.picture,
            type: product.brand.type,
            desc: product.brand.description,
            place: product.brand.place
        } : null,
        salesCount: product.salesCount,
        commentCount: product.commentCount,
        collectCount: product.collectCount,
        mainVideos: product.mainVideos ? JSON.parse(product.mainVideos) : [],
        videoScale: product.videoScale,
        mainPictures: product.mainPictures ? JSON.parse(product.mainPictures) : [],

        details: product.details ? JSON.parse(product.details) : {},

        // 🔹 specs 來自 skus.specValues
        specs: product.skus && product.skus.length > 0 ? extractSpecsFromSKUs(product.skus) : [],

        // 🔹 skus 內的 specValues 改為關聯 specs
        skus: product.skus ? product.skus.map(sku => ({
            id: sku.id,
            skuCode: sku.skuCode,
            price: sku.price,
            oldPrice: sku.oldPrice,
            inventory: sku.inventory,
            picture: sku.picture,
            specs: sku.specValues ? sku.specValues.map(specValue => ({
                name: specValue.spec.name,
                valueName: specValue.value
            })) : []
        })) : [],

        categories: product.category ? [
            getTopCategory(product.category), // 最頂層分類
            {
                id: product.category.id,
                name: product.category.name,
                parent: product.category.parent ? {
                    id: product.category.parent.id,
                    name: product.category.parent.name
                } : null
            }
        ] : [],

        isPreSale: product.isPreSale,
        isCollect: product.isCollect
    };
}

function extractSpecsFromSKUs(skus) {
    const specsMap = new Map();

    skus.forEach(sku => {
        if (sku.specValues) {
            sku.specValues.forEach(specValue => {
                if (!specValue.spec) return; // 確保 specValue.spec 存在

                if (!specsMap.has(specValue.spec.id)) {
                    specsMap.set(specValue.spec.id, {
                        id: specValue.spec.id,
                        name: specValue.spec.name,
                        values: []
                    });
                }

                const spec = specsMap.get(specValue.spec.id);

                // 確保該值不重複
                if (!spec.values.some(v => v.name === specValue.value)) {
                    spec.values.push({
                        name: specValue.value,
                        picture: specValue.picture || null,
                        desc: specValue.description || null
                    });
                }
            });
        }
    });

    return Array.from(specsMap.values());
}




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





