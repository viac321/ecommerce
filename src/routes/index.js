const express = require('express');
const router = express.Router();
const user = require('./user.route');

// colocar las rutas aquí
router.use("/users", user);

module.exports = router;