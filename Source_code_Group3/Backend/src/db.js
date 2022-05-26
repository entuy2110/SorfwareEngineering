const { Sequelize, DataTypes, Model } = require('sequelize');
let db = new Sequelize('lms2022', 'root', 'TyNewPass5!', {
  host: 'localhost',
  dialect: 'mysql'
});

const userModel = require('./models/user');
const subjectModel = require('./models/subject');
const courseModel = require('./models/course');
const userCourseModel = require('./models/user-course');
const documentModel = require('./models/document');
const contentModel = require('./models/content');
const assignmentModel = require('./models/assignment');
const submissionModel = require('./models/submission');
const roleModel = require('./models/role');


class User extends Model { }

User.init(userModel.schema, {
  sequelize: db,
  modelName: userModel.modelName
});

class Subject extends Model { }

Subject.init(subjectModel.schema, {
  sequelize: db,
  modelName: subjectModel.modelName
});

class Course extends Model { }

Course.init(courseModel.schema, {
  sequelize: db,
  modelName: courseModel.modelName
});

class UserCourse extends Model { }

UserCourse.init(userCourseModel.schema, {
  sequelize: db,
  modelName: userCourseModel.modelName
});

class Document extends Model { }

Document.init(documentModel.schema, {
  sequelize: db,
  modelName: documentModel.modelName
});

class Content extends Model { }

Content.init(contentModel.schema, {
  sequelize: db,
  modelName: contentModel.modelName
});

class Assignment extends Model { }

Assignment.init(assignmentModel.schema, {
  sequelize: db,
  modelName: assignmentModel.modelName
});

class Submission extends Model { }

Submission.init(submissionModel.schema, {
  sequelize: db,
  modelName: submissionModel.modelName
});

class Role extends Model { }

Role.init(roleModel.schema, {
  sequelize: db,
  modelName: roleModel.modelName
});

//*LMS */
User.belongsTo(Role);

User.hasMany(Course);
User.belongsToMany(Course, { through: UserCourse });
Course.belongsToMany(User, { through: UserCourse });
Subject.hasMany(Course);
Course.belongsTo(Subject);


//Course management
User.hasMany(Document);
Course.hasMany(Document);
User.hasMany(Content);
Course.hasMany(Content);
User.hasMany(Assignment);
Course.hasMany(Assignment);
User.hasMany(Submission);
Assignment.hasMany(Submission);


async function init() {
  await db.authenticate();
  await db.sync();
}

module.exports = {
  models: db.models,
  init: init
}
