const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('in', 'out'),
        defaultValue: 'in',
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'attendances',
    timestamps: false,
});

Attendance.associate = (models) => {
  Attendance.belongsTo(models.User, {
      foreignKey: 'userId', 
      as: 'user',
  });
};

module.exports = Attendance;
