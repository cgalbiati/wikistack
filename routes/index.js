var express = require('express');
var router = express.Router();
var Page = require('../models').Page
var User = require('../models').User

/* GET home page. */
router.get('/', function(req, res, next) {
	Page.find({}).exec(function(err, pages) {
		res.render('index', { title: 'Pages', things: pages});
		}
	);
	user = new User({name: "me",
          email: "myemail"})
	console.log(user);
	  
});


module.exports = router;
