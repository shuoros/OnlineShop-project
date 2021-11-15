const Sequelize = require("sequelize");

const sequelize = require("../config/database/sequelize");

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [4, 30],
    },
    base_price: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        trim: true,
    },
    temp_price: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        trim: true,
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,

        // allowNull: false,
    },

    description: {
        type: Sequelize.STRING,
        // allowNull: false,
        trim: true,
        unique: true,
    },
    photo: {
        type: Sequelize.BLOB,
    },
    avtivityStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
});

module.exports = Product;
