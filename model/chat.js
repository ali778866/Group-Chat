const Sequelize = require('sequelize');

const sequelize= require('../utility/database');

const Chat = sequelize.define('chat', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        message: Sequelize.STRING,
    })

module.exports = Chat;