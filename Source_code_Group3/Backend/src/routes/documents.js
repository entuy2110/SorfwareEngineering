const express = require('express');
const router = express.Router();
const {models} = require('../db');
var multer  = require('multer');
var fs = require('fs');
const Document = models.Document;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/documents')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,   uniqueSuffix + '-' +file.originalname)
  }
});
var upload = multer({ storage: storage })
//thêm mới
router.post('/new',upload.single('userDoc') ,function(req, res) {
  let document = Document.build(req.body);
  document.docContent= req.file.path;
    document.save().then(b => {
    
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

router.get('/download/:idDocument',function(req, res) {
  
  let idDocument = req.params.idDocument;
  Document.findByPk(idDocument).then(b => {
    const file = `${b.docContent}`;
    res.download(file);
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});

//xóa
router.post('/delete/:idDocument', function(req, res) {
  let idDocument = req.params.idDocument;
  Document.findByPk(idDocument).then(b => {
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
