const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idAssignment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assignName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assignDes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    assignDeadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    assignWeeks: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  
  },
  modelName: 'Assignment'
}
