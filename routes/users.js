var express = require('express');
var router = express.Router();
var User = require('../models').User

/* GET users listing. */

router.get('/', function(req, res, next) {
	User.find({}).exec(function(err, users) {
		res.render('index', { title: 'Users', things: users});
		}
	);
	  
});

// router.get('/:urlTitle', function(req, res, next) {
// 	Page.findOne({"urlTitle": req.params.urlTitle}).exec(function(err, page) {
// 		console.log(page);
// 		res.render('wikipage', {page: page});
// 		}
// 	);
// });

module.exports = router;
