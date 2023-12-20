'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commande.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
        targetKey: 'id' // name of the primary key in the table users
      })
      Commande.belongsTo(models.Address, {
        as: 'deliveryAddress',
        foreignKey: 'delivery_address',
        targetKey: 'id' // name of the primary key in the table Address
      });
      Commande.belongsTo(models.Address, {
        as: 'billingAddress',
        foreignKey: 'billing_address',
        targetKey: 'id'
      });
      Commande.hasMany(models.Commande_line)
    }
  }
  Commande.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

    reference: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'id'
      }
    },
    billing_address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'id'
      }
    },
    /*payement_card: DataTypes.STRING(20),*/
    payement_ref: DataTypes.STRING(20),
    state: DataTypes.STRING(10),
    notes: {
      type:DataTypes.STRING(500),
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Commande',
    underscored: true
  });
  return Commande;
};
