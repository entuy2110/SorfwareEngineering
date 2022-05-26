const express = require('express');
const router = express.Router();
const {models} = require('../db');
const Subject = models.Subject;
const Course = models.Course;
//liệt kê
router.get('/list', async function(req, res) {
  let subjects = Subject.findAll().then(subjects => {
    res.send({
      success: true,
      data:subjects
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
  let subject = Subject.build(req.body);
  subject.save().then(b => {
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
//xóa môn
router.get('/delete/:idSubject', function(req, res) {
  let idSubject = req.params.idSubject;
  Subject.findByPk(idSubject).then(b => {
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
    });
  });
});
module.exports = router;
