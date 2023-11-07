const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Group = sequelize.define('group', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    groupname: Sequelize.STRING,
})

module.exports = Group;