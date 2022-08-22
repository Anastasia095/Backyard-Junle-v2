const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plants extends Model { }

Plants.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Scientific_Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Common_Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'plants',
    timestamps: false
  }
);

module.exports = Plants;
