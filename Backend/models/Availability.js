const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Availability = sequelize.define('Availability', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
});

module.exports = Availability;