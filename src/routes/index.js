const express = require('express');
const router = express.Router();
const user = require('./user.route');
const category = require('./category.route');
const product = require('./product.route');
const purchase = require('./purchase.route');
const cart = require('./cart.route');
const verifyJWT = require('../utils/verifyJWT');

// colocar las rutas aquí
router.use("/users", user);
router.use("/categories", category);
router.use("/products", product)
router.use("/purchases", purchase)
router.use("/carts", verifyJWT,cart )


module.exports = router;