'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product)
    }
  }
  Category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,

    img: DataTypes.STRING,
    top: DataTypes.INTEGER,
    background: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },


    status: {
      type: DataTypes.ENUM('1', '2'),
      defaultValue: "2",
      allowNull: false,
    },



  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};