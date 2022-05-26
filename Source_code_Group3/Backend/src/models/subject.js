const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idSubject: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    subjectCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
  
  },
  modelName: 'Subject'
}
