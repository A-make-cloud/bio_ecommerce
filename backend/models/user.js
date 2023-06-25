'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Address)
      User.hasMany(models.Reset_password)
      User.hasMany(models.Commande)
    }
  }
  User.init({
    civility: {
      type: DataTypes.ENUM('M', 'Mme'),
      defaultValue: "M",
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    profil: {
      type: DataTypes.ENUM('admin', 'client'),
      allowNull: false,
      defaultValue: "client",
    },
    status: {
      type: DataTypes.ENUM(1, 2, 3),
      allowNull: false,
      defaultValue: "3",
    },
    email: {
      allowNull: false,
      isEmail: true,
      type: DataTypes.STRING(50),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        //  hacher le mot de passe avant de l'enregistrer
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hashedPassword);
      }
    },
    confirmedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    underscored: true
  });
  return User;
};
