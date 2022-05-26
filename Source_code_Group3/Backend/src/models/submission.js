const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idSubmission: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    submissionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submissionDes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    submissionFile: {
      type: DataTypes.STRING,
      allowNull:false
    },
 
  },
  modelName: 'Submission'
}
