const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idCourse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    teacher: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseSemester: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    ,
    courseYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    ,
    courseDes: {
      type: DataTypes.TEXT
    },
    courseWeeks: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  
  },
  modelName: 'Course'
}
