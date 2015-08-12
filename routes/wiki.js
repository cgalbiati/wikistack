var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next) {
  res.send('respond for add');
});

module.exports = router;
