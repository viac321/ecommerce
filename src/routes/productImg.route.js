const { getAll, create, remove } = require('../controllers/productImg.controller');
const express = require('express');
const upload = require('../utils/multer');

const productImg = express.Router();

routerproductImg.route('/')
    .get(getAll)
    .post(upload.single('image'), create)
    
routerProductImg.route('/:id')
    .delete(remove)    
    
module.exports = productImg;