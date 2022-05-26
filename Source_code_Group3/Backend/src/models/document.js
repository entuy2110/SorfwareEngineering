const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idDoc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    docName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    docContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    docWeeks: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  
  },
  modelName: 'Document'
}
