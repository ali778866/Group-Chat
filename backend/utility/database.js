const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    'group-chat-app',
    'root',
    'Ali@9934',
    { dialect: 'mysql', host: 'localhost' }
)

module.exports = sequelize;
