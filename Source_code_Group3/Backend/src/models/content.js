const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idCont: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    contName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contDes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contWeeks: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  
  },
  modelName: 'Content'
}
