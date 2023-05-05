'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      Address.belongsTo(models.User)      
      Address.hasMany(models.Commande, { as: 'deliveryAddress', foreignKey: 'delivery_address' })
      Address.hasMany(models.Commande, { as: 'billingAddress', foreignKey: 'billing_address' })

    }
  }
  Address.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.ENUM('livraison', 'facturation'),
      defaultValue: 'livraison',
      allowNull: false,
    },
    street: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    complement: {
      type: DataTypes.STRING,

    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    zipcode: {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    information: {
      type: DataTypes.TEXT,

    },


  }, {
    sequelize,
    modelName: 'Address',
    underscored: true
  }, {
    classMethods: {
      associate: function (models) {
        Todo.belongsTo(models.User)
      }
    }
  });
  return Address;
};