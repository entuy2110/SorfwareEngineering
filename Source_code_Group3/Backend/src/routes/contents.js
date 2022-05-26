const express = require('express');
const router = express.Router();
const {models} = require('../db');
const Content = models.Content;


router.post('/new', function(req, res) {
  let content = Content.build(req.body);
  content.save().then(b => {
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

router.get('/get/:idContent', function(req, res) {
  let idContent = req.params.idContent;
  Content.findByPk(idContent).then(b => {
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

router.post('/edit/:idContent', function(req, res) {
  let content = req.body;
  let idContent = req.params.idContent;
  Content.findByPk(idContent).then(b => {
    b = content;
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

router.post('/delete/:idContent', function(req, res) {
  let idContent = req.params.idContent;
  Content.findByPk(idContent).then(b => {
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
