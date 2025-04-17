const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primeiroAcesso: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Define como true por padrão
  },
});

module.exports = Usuario;
