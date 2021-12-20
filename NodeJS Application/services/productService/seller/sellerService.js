const Product = require("../../../models/Product");
const Category = require("../../../models/Category");
const Tag = require("../../../models/Tag");
const Brand = require("../../../models/Brand");
const Comment = require("../../../models/Comment");
const Customer = require("../../../models/Customer");
const Product_views = require("../../../models/Product_views");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

exports.insertProduct = async (req) => {
    try {
        //to do : uncomment this

        // if (!req.body.categoryId || !req.body.brandId) {
        //     return "categoryOrBrandEmpty";
        // }

        let photoPath = req.files;
        //console.log(Object.values(pathes));
        let pathArray = Object.values(photoPath).map((a) => a.path);
        const newProduct = new Product({
            name: req.body.name,
            base_price: req.body.base_price,
            temp_price: req.body.temp_price,
            quantity: parseInt(req.body.quantity),
            description: req.body.description,
            activityStatus: req.body.activityStatus,
            categoryId: req.body.categoryId,
            photo: pathArray,
            tagId: req.body.tagId,
            brandId: req.body.brandId,
        });

        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.indexProducts = async (req) => {
    try {
        let filter = {};
        filter.category = req.query.category ? req.query.category.split(",") : {};
        filter.tag = req.query.tag ? req.query.tag.split(",") : {};
        filter.brand = req.query.brand ? req.query.brand.split(",") : {};
        filter.price = req.query.price ? req.query.price.split(",") : [0, 99990000];

        console.log(filter);
        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [
                { model: Category, where: { id: { [Op.or]: filter.category } } },
                { model: Brand, where: { id: { [Op.or]: filter.brand } } },
                { model: Product_Tag, where: { tagId: { [Op.or]: filter.tag } } },
                //  { model: Tag, where: { tagId: { [Op.or]: filter.tag } } },
                {
                    model: Product_views,
                    required: false,
                    attributes: ["viewCount"],
                },
            ],
            //ordering by views
            //to do : add other orders
            // order: [[Product_views, "viewCount", "desc"]],
            // order: [["AvgRating", "DESC"]],
            where: {
                base_price: {
                    [Op.between]: filter.price,
                },
            },
        });
        return products;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.getProductComments = async (req) => {
    try {
        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;

        const id = req.params.id;
        const comments = await Comment.findAll({
            include: [{ model: Customer }],
            where: {
                productId: id,
            },
            include: [{ model: Customer, attributes: ["fname", "lname"] }],

            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return comments;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.getOneProduct = async (req) => {
    try {
        const id = req.params.id;

        const products = await Product.findOne({
            include: [
                { model: Category, attributes: ["title"] },
                //  { model: Tag, attributes: ["title"] },
                { model: Brand, attributes: ["PersianName", "EnglishName"] },

                {
                    model: Product_views,
                    required: false,
                    attributes: ["viewCount"],
                    //  as: "views",
                },
            ],
            where: {
                id: id,
            },
        });
        return products;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.searchProducts = async (req) => {
    try {
        let filter = {};
        filter.category = req.query.category ? req.query.category.split(",") : {};
        filter.tag = req.query.tag ? req.query.tag.split(",") : {};
        filter.brand = req.query.brand ? req.query.brand.split(",") : {};
        filter.price = req.query.price ? req.query.price.split(",") : [0, 99990000];

        let searchString = req.query.search;

        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),

            include: [
                {
                    model: Category,
                    where: {
                        id: { [Op.or]: filter.category },
                    },
                },
                { model: Brand, where: { id: { [Op.or]: filter.brand } } },
                { model: Product_Tag, where: { tagId: { [Op.or]: filter.tag } } },
                {
                    model: Product_views,
                    required: false,
                    attributes: ["viewCount"],
                },
            ],
            //ordering by views
            //to do : add other orders
            // order: [[Product_views, "viewCount", "desc"]],
            // order: [["AvgRating", "DESC"]],
            where: {
                base_price: {
                    [Op.between]: filter.price,
                },
                [Op.or]: [
                    {
                        "$Category.title$": { [Op.like]: "%" + searchString + "%" },
                    },

                    {
                        name: { [Op.like]: "%" + searchString + "%" },
                    },
                ],
            },
        });
        if (!products) {
            return "ProductNotFound";
        }
        return products;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.updateProduct = async (req) => {
    try {
        const productId = req.params.id;
        const foundProduct = await Product.findByPk(productId);
        if (!foundProduct) {
            return "productNotFound";
        }
        const name = req.body.name ? req.body.name : foundProduct.name;

        const base_price = req.body.base_price
            ? req.body.base_price
            : foundProduct.base_price;

        const temp_price = req.body.temp_price
            ? req.body.temp_price
            : foundProduct.roleId;

        const count = req.body.count ? req.body.count : foundProduct.count;
        const description = req.body.description
            ? req.body.description
            : foundProduct.roleId;

        const photo = req.body.photo ? req.body.photo : foundProduct.photo;

        const activityStatus = req.body.activityStatus
            ? req.body.activityStatus
            : foundProduct.activityStatus;

        const upproduct = await Product.findByPk(productId).then((product) => {
            product.name = name;
            product.base_price = base_price;
            product.temp_price = temp_price;
            product.count = count;
            product.description = description;
            product.photo = photo;
            product.activityStatus = activityStatus;
            return product.save();
        });
        return upproduct;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.destroyProduct = async (req) => {
    const productId = req.body.productId;
    // to do :nabayad az order ha pak she
    try {
        const product = await Product.destroy({
            where: {
                id: productId,
            },
        });
        if (product) return true;
        else return false;
    } catch (e) {
        console.log(e);
        return false;
    }
};
