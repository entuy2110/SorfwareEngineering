const express = require('express');
const router = express.Router();
const {models} = require('../db');
var multer  = require('multer');
var fs = require('fs');
const Submission = models.Submission;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/assignments')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,   uniqueSuffix + '-' +file.originalname)
  }
});
var upload = multer({ storage: storage })
//tạo mới
router.post('/new',upload.single('userSubmission') ,function(req, res) {
  let submission = Submission.build(req.body);
  submission.submissionFile= req.file.path;
  submission.save().then(b => {
    
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
//get
router.get('/get/:idUser/:idAssignment', function(req, res) {
  let idAssignment = req.params.idAssignment;
  let idUser = req.params.idUser;
  Submission.findOne({ where: { UserIdUser: idUser, AssignmentIdAssignment: idAssignment } }).then(b => {
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
//download bt
router.get('/download/:idSubmission',function(req, res) {
  let idSubmission = req.params.idSubmission;
  Submission.findByPk(idSubmission).then(b => {
    const file = `${b. submissionFile}`;
    res.download(file);
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});
//lấy ds
router.get('/list/:idAssignment', function(req, res) {
  let idAssignment = req.params.idAssignment;
  Submission.findAll({ where: {AssignmentIdAssignment: idAssignment } }).then(b => {
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
//sửa
router.post('/edit/:idSubmission', function(req, res) {
  let submission = req.body;
  let idSubmission = req.params.idSubmission;
  Submission.findByPk(idSubmission).then(b => {
    b = submission;
    return b.save();
  }).then(b => {
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

//xóa
router.post('/delete/:idSubmission', function(req, res) {
  let idSubmission = req.params.idSubmission;
  Submission.findByPk(idSubmission).then(b => {
    if(b != null)
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
