const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart')

//  Product -> categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

//Cart -> productId
//Cart.belongsTo(Product)
//Product.hasMany(Cart)