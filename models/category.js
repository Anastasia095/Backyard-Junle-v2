const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Category extends Model {}

Category.init(
  //body, type string, allow null false
  {
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
    timestamps: false
  }
)

module.exports = Category
