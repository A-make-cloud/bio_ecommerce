'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product)
    }
  }
  Image.init({
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },

    type: {
      type: DataTypes.ENUM('max', 'min'),
      defaultValue: "max",
      allowNull: false,
    },
    url: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};