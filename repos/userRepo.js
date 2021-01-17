const User = require('../models/user');

module.exports = {
    createUser: function (username, encpassword) {
        const newUser = User.create({
            username: username,
            password: encpassword
        })
            .then(result => result)
            .catch(err => err);
        return newUser;
    },

    findUserByName: function (username) {
        const user = User.findOne({
            where: {
                username: username,
            }
        })
            .then(result => result)
            .catch(err => err);
        return user;
    },

    findUserById: function(userid){
        const user = User.findOne({
            where:{
                id:userid
            }
        })
            .then(result=>result)
            .catch(err=>err);
            
        return user;
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