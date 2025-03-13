const db = require('../models/main.js');
const Banner = db.Banner;
const Category = db.Category;

exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.findAll({
            include: [{ model: Category, as: 'category' }]
        });

        const response = {
            code: "1",
            msg: "操作成功",
            result: banners.map(banner => formatBanner(banner))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: "0", msg: "系統錯誤" });
    }
};

function formatBanner(banner) {
    return {
        id: banner.id,
        imgUrl: banner.imgUrl,
        hrefUrl: `/category/${banner.categoryId}`,
        type: banner.type
    };
}
