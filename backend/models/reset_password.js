'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reset_password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reset_password.belongsTo(models.User)
    }
  }
  Reset_password.init({
    userId: {

      type: DataTypes.INTEGER,
      allowNull: false,

    },
    email: {
      isEmail: true,
      type: DataTypes.STRING(50),
      allowNull: false,

    },
    token: DataTypes.STRING,
    status: DataTypes.ENUM(1, 2),

  }, {
    sequelize,
    modelName: 'Reset_password',
  });
  return Reset_password;
};