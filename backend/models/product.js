'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.hasMany(models.Image)
      Product.hasMany(models.Commande_line)
    }
  }
  Product.init({
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: DataTypes.TEXT,
    price_ht: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    tva: {
      allowNull: false,
      type: DataTypes.DECIMAL(4, 2)
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('1', '2'),
      defaultValue: '2',
    },
    top: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Product',
    underscored: true
  });
  return Product;
};