const express = require('express');
const router = express.Router();
const {models} = require('../db');
const { Op } = require("sequelize");
var Promise = require('promise');
const Course = models.Course;
const User = models.User;
const Content = models.Content;
const Assignment = models.Assignment;
const Document = models.Document;
const UserCourse = models.UserCourse;
//liệt kê
router.get('/list/:courseName', function(req, res) {
  let courseName = req.params.courseName;
  let courses = Course.findAll({ where: { courseName :  {   [Op.substring]: courseName } }}).then(courses => {
    res.send({
      success: true,
      data:courses
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});
//tạo mới
router.post('/new', function(req, res) {
  let course = Course.build(req.body);
  course.save().then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    })
  });
});

//truy cập khóa học
router.post('/find/:idCourse/:idUser', async function(req, res) {
  let idCourse = req.params.idCourse;
  let idUser = req.params.idUser;
  
  const courseInfo = Course.findByPk(idCourse);
  const contentList = Content.findAll({ where: { CourseIdCourse: idCourse } });
  const assignmentList = Assignment.findAll({ where: { CourseIdCourse: idCourse} });
  const documentList = Document.findAll({ where: { CourseIdCourse: idCourse } });
  const status = UserCourse.findOne({ where: { CourseIdCourse: idCourse, UserIdUser: idUser } })
  Promise.all([courseInfo, contentList, assignmentList, documentList,status]).then(b => {
    res.send({
      success: true,
      data: b
    })
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});
//danh sách sinh viên
router.post('/students/:idCourse', function(req, res) {
  let idCourse = req.params.idCourse;

  UserCourse.findAll({ where: { CourseIdCourse: idCourse } }).then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    })
  });
});
//duyệt sinh viên
router.post('/edit/:idCourse/:idUser', function(req, res) {
  let idCourse = req.params.idCourse;
  let idUser = req.params.idUser;
  UserCourse.findOne({ where: { CourseIdCourse: idCourse, UserIdUser: idUser } }).then(b => {
    b.status = true;
    return b.save();
  }).then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    })
  });
});
//xóa sv
router.post('/delete/:idCourse/:idUser', function(req, res) {
  let idCourse = req.params.idCourse;
  let idUser = req.params.idUser;
  UserCourse.findOne({ where: { CourseIdCourse: idCourse, UserIdUser: idUser } }).then(b => {
    return b.destroy();
  }).then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    })
  });
});

//xóa khóa học
router.post('/delete/:idCourse', function(req, res) {
  let idCourse = req.params.idCourse;
 Course.findByPk(idCourse).then(b=>{
    return b.destroy();
  }).then( UserCourse.findAll({ where: { CourseIdCourse: idCourse} })).then(b => {
    return b.destroy();
  }).then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    })
  });

});
module.exports = router;
