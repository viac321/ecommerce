const express = require('express');
const router = express.Router();
const user = require('./user.route');
const category = require('./category.route');

// colocar las rutas aquí
router.use("/users", user);
router.use("/categories", category);

module.exports = router;