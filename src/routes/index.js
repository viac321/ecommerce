const express = require('express');
const router = express.Router();
const user = require('./user.route');
const category = require('./category.route');
const product = require('./product.route');
const purchase = require('./purchase.route');

// colocar las rutas aquí
router.use("/users", user);
router.use("/categories", category);
router.use("/products",product)
router.use("/purchases",purchase)


module.exports = router;