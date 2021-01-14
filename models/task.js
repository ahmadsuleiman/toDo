const { DataTypes, INTEGER } = require('sequelize');

const {sequelize} = require('../startUp/db');
const {User} = require('./user');
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
    .then(result => console.log(result))
    .catch(err => console.log(err));
exports.Task = Task;