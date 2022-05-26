const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    
  },
  modelName: 'Role'
}
