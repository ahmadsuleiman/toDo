const {User} = require('../models/index');

module.exports = {
    createUser: function (username, encpassword) {
        return User.create({
            username: username,
            password: encpassword
        })
    },

    findUserByName:  function (username) {
        return User.findOne({
            where: {
                username: username,
            }
        })
    },

    findUserById: function(userid){
        return User.findOne({
            where:{
                id:userid
            }
        })
    },

    validate: function (req) {
        const user = {username:'',password:'',msg:''}
        const { username, password } = req;
        user.username = username;
        user.password = password;
        if (!username) {
            user.msg = 'enter username';
        }
        else if (!password) {
            user.msg = 'enter password';
        }
        return user;
    }
}