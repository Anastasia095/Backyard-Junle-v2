//sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const Category = require('./category.js');

class Post extends Model { }

Post.init(
  //title, type string, allow null false
  //body, type string, allow null false
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'category',
        key: 'title',
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
  }, 
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);



module.exports = Post;
