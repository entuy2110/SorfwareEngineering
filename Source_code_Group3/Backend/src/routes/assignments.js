const express = require('express');
const router = express.Router();
const {models} = require('../db');
var multer  = require('multer')
const Assignment = models.Assignment;

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
router.post('/new',function(req, res) {
  let assignment = Assignment.build(req.body);
  assignment.save().then(b => {
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
//lấy nội dung HW
router.get('/get/:idAssignment', function(req, res) {
  let idAssignment = req.params.idAssignment;
  Assignment.findByPk(idAssignment).then(b => {
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


// router.get('/download',function(req, res) {
  
//   let idAssignment = req.body.idAssignment;
//   Document.findByPk(idDocument).then(b => {
//     const file = `${b.assignContent}`;
//     res.download(file);
//   }).catch(e => {
//     res.send({
//       success: false,
//       data: e.message
//     });
//   });
// });

//Sửa
router.post('/edit/:idAssignment', function(req, res) {
  let assignment = req.body;
  let idAssignment = req.params.idAssignment;
  Assignment.findByPk(idAssignment).then(b => {
    b = assignment;
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
//Xóa
router.post('/delete/:idAssignment', function(req, res) {
  let idAssignment = req.params.idAssignment;
  Assignment.findByPk(idAssignment).then(b => {
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
