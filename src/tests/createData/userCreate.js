const User = require('../../models/User')
const userCreate = async () => {

    await User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        password: 'admin1234',
        phone: '+212156'
    })


}

module.exports = userCreate