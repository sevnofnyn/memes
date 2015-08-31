var express = require('express');
var router = express.Router();
var fs= require('fs');
var path = require('path');
var memes = require('../models/memes');
var snark = require('../models/snark');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('memes', {'memes': memes, 'comments': snark});

});

module.exports = router;