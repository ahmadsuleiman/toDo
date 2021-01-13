
const { Sequelize, DataTypes } = require('sequelize');
const {Task} = require('./task');
const {User} = require('./user');

const sequelize = new Sequelize('sqlite::memory:');

const UserTasks = sequelize.define('UserTasks', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: Task,
            key: 'id'
        }
    },
    TaskId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

User.belongsToMany(Task, { through: UserTasks });
Task.belongsToMany(User, { through: UserTasks });

UserTasks.sync()
    .then(result => console.log(result))
    .catch(err => console.log(err));

exports.UserTasks = UserTasks;