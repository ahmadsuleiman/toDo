
const Sequelize = require('sequelize');

exports.sequelize =  new Sequelize('sqlite::memory:');
