'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commande.belongsTo(models.User)
      Commande.belongsTo(models.Address)
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
    delivery_address: DataTypes.INTEGER,
    billing_address: DataTypes.INTEGER,
    payement_card: DataTypes.STRING(20),
    payement_ref: DataTypes.STRING(20),


  }, {
    sequelize,
    modelName: 'Commande',
    underscored: true
  });
  return Commande;
};