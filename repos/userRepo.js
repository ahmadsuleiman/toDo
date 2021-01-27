const { User } = require('../models/index');

module.exports = {
    createUser: function (username, encpassword) {
        return User.create({
            username: username,
            password: encpassword
        })
    },

    findUserByName: function (username) {
        return User.findOne({
            where: {
                username: username,
            }
        })
    },

    findUserById: function (userid) {
        return User.findOne({
            where: {
                id: userid
            }
        })
    },

    getAllUsers: function () {
        return User.findAll();
    }
}