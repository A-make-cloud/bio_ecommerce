'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commande_line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commande_line.belongsTo(models.Commande)
      Commande_line.belongsTo(models.Product)

    }
  }
  Commande_line.init({

    commandeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price_ht: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    tva: {
      allowNull: false,
      type: DataTypes.DECIMAL(2, 2),
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },

  }, {
    sequelize,
    modelName: 'Commande_line',
  });
  return Commande_line;
};