const User = require('../models/User');

const createUser = (registerData) => {
    return User.create(registerData);
}

const findUserByUsername = (username) => {
    return User.findOne({ username })
}

module.exports = {
    createUser,
    findUserByUsername,
}