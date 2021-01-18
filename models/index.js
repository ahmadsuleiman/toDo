const Task = require('./task');
const User = require('./user');

User.hasMany(Task);
Task.belongsTo(User);

User.sync();
Task.sync();

exports.User = User;
exports.Task = Task;