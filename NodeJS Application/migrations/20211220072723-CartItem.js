"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        queryInterface.createTable("cartItem", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            quantity: Sequelize.INTEGER,
            price: {
                type: Sequelize.DECIMAL(20, 2),
                allowNull: false,
                trim: true,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */ return queryInterface.dropTable("cartItem");
    },
};
