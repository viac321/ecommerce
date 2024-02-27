const { getAll } = require('../controllers/productImg.controller');
const express = require('express');
const upload = require('../utils/multer');

const productImg = express.Router();

productImg.route('/')
    .get(getAll)
    .post(upload.single('image'))

module.exports = productImg;