const express = require('express');
const router = express.Router();
const user = require('./user.route');
const category = require('./category.route');
const product = require('./product.route');
const cart = require('./cart.route');
const verifyJWT = require('../utils/verifyJWT');
const routerPurchase = require('./purchase.route');
const routerProductImg = require('./productImg.route')
// colocar las rutas aquí
router.use("/users", user);
router.use("/categories", category);
router.use("/products", product)
router.use("/purchases", verifyJWT, routerPurchase)
router.use("/carts", verifyJWT,cart )
router.use(" /product_images",routerProductImg)


module.exports = router;