const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const Purchase = require('./Purchase');
const ProductImg = require('./ProductImg');

//  Product -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

//Cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

Purchase.belongsTo(User)
User.hasMany(Purchase)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)

ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)

ProductImg.belongsTo(Purchase)
Purchase.hasMany(ProductImg)