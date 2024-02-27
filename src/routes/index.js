const express = require('express');
const routerUser = require('./user.route')
const routerCategory = require('./category.route');
const routerProduct = require('./product.route');
const routerCart = require('./cart.route');
const verifyJWT = require('../utils/verifyJWT');
const routerPurchase = require('./purchase.route');
const routerProductImg = require('./productImg.router')
const router = express.Router();


router.use("/users", routerUser);
router.use("/categories", routerCategory);
router.use("/products", routerProduct)
router.use("/purchases", verifyJWT, routerPurchase)
router.use("/carts", verifyJWT,routerCart)
router.use('/product_images', routerProductImg)

module.exports = router;