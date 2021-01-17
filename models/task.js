const { DataTypes, INTEGER } = require('sequelize');

const {sequelize} = require('../startUp/db');
const User = require('./user');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        validate: {
            max: 500
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

User.hasMany(Task);
Task.belongsTo(User);

Task.sync()
    .then(result => result)
    .catch(err => err);
module.exports = Task;