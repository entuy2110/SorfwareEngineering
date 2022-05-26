const express = require('express');
const router = express.Router();
const {models} = require('../db');
var multer  = require('multer')

const User = models.User;
const Course = models.Course;
const Assignment = models.Assignment;
const Role = models.Role;

const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/avatars')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,   uniqueSuffix + '-' +file.originalname)
  }
});
var upload = multer({ storage: storage })
//login
router.post('/login', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  const account = User.findOne({ where: { email: email, password: password } });
  Promise.all([account]).then(b => {
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

router.get('/list', async function(req, res) {
  let users = User.findAll({
    include: [Course,Assignment]
  }).then(users => {
    res.send({
      success: true,
      data:users
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});
//tạo mới
router.post('/new',function(req, res) {
  let user = User.build(req.body);
  user.save().then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(error => {
    res.send({
      success: false,
      data: error.message
    })
  });
});

//tạo role
router.post('/new2',function(req, res) {
  let role = Role.build(req.body);
  role.save().then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(error => {
    res.send({
      success: false,
      data: e.message
    })
  });
});

//chỉnh sửa tt
router.post('/edit/:idUser', function(req, res) {
  let user = req.body;
  let idUser = req.params.idUser;
  User.findByPk(idUser).then(b => {
    b.familyName = user.familyName;
    b.firstName = user.firstName;
    b.birthday = user.birthday;
    b.country = user.country;
    b.province = user.province;
    b.district = user.district;
    b.userDes = user.userDes;
    if(user.password){
      b.password = user.password;
    }
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
//lấy thông tin
router.get('/:idUser', function(req, res) {
  let idUser = req.params.idUser;
  User.findByPk(idUser,{include: [Course]}).then(b => {
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

//lấy ảnh
// router.post('/img',function(req, res) {
//   let path = req.body.path;
//   path = path.replace("[/\]","[\]")
//   // let newPath = path.join(__dirname, '..', path);
//   res.send({
//     data : path
//   })
//   .catch(error => {
//     res.send({
//       success: false,
//       data: path
//     })
//   });
// });

module.exports = router;
