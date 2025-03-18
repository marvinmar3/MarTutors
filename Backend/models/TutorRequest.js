const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TutorRequest = sequelize.define('TutorRequest', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tutorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  scheduleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  }
});

module.exports = TutorRequest;