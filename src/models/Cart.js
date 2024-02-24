const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    producId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantuty: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cart;