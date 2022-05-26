const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idUC: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  modelName: 'UserCourse'
}
