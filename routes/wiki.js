var express = require('express');
var Page = require('../models').Page;
var User = require('../models').User;
var makeURL = require('../models').makeURL;
var findOrCreateUser = require('../models').findOrCreateUser;
var makePage = require('../models').makePage;

var router = express.Router();
var bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
	var authorId = findOrCreateUser(req.body);
	var newPage = makePage(authorId, req.body);
	newPage.save().then(function(newPage) {
		res.redirect(newPage.route);
	}).then(null, next);
	
});

router.get('/add', function(req, res, next) {
	res.render('addpage');
});


router.get('/:urlTitle', function(req, res, next) {
	Page.findOne({"urlTitle": req.params.urlTitle}).exec(function(err, page) {
		console.log(page);
		res.render('wikipage', {page: page});
		}
	);
});

module.exports = router;
