const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING
    },
    province: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    userDes: {
      type: DataTypes.TEXT
    },
  },
  modelName: 'User'
}
