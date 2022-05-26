const express = require('express');
const router = express.Router();
const {models} = require('../db');
const UserCourse = models.UserCourse;

router.get('/list', async function(req, res) {
  let list = UserCourse.findAll({
  }).then(list => {
    res.send({
      success: true,
      data:list
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});
//thêm sv vào ds chờ
router.post('/new', function(req, res) {
  let data = UserCourse.build(req.body);
  let list = UserCourse.findAll({where:{UserIdUser : req.body.UserIdUser, CourseIdCourse:req.body.CourseIdCourse}}).then(b=>{
    if(b.length==0){
      data.save()
      res.send({
        success: true,
        data: list
      });
    }else{
      res.send({
        success: false,
      })
    }
  })
  // .then(b => {
  //   res.send({
  //     success: true,
  //     data: list
  //   });
  // }).catch(error => {
  //   res.send({
  //     success: false,
  //     data: e.message
  //   })
  // });
});



// router.post('/delete/:idCourse/:idUser', function(req, res) {
//   let idCourse = req.params.idCourse;
//   let idUser = req.params.idUser;
//   UserCourse.findOne({ where: { CourseIdCourse: idCourse, UserIdUser: idUser } }).then(b => {
//     res.send({
//       success: true,
//       data: b
//     })
//   }).catch(e => {
//     res.send({
//       success: false,
//       data: e.message
//     });
//   });
// });


module.exports = router;
