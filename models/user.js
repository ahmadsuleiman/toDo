const { DataTypes } = require('sequelize');

const {sequelize} = require('../startUp/db');

//const sequelize = new Sequelize('sqlite::memory:');

/*async function chcekConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

chcekConnection();*/

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8
        }
    }
})

User.sync()
    .then(result => console.log(result))
    .catch(err => console.log(err));

exports.User =  User;