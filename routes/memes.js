var express = require('express');
var router = express.Router();
var fs= require('fs');
var path = require('path');
var memes = require('../models/memes');
var snark = require('../models/snark');

snark = JSON.stringify(snark);

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('memes', {'memes': memes, 'comments': snark});

});

router.get('/snark', function(req, res, next){
  var file1 = path.join(__dirname, '../models/snark.json');
  fs.readFile(file1, 'utf8', function(err, data){
    if (err){
      next(err);
    } else {
      res.send(data);
    }
  });
});

router.post('/', function(req, res, next) {
  //This is going to read the snark file and it is going to parse the JSON data and push our request data on to it and write back to the JSON file
  var file = path.join(__dirname, '../models/snark.json');
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      next(err);
    }
    else {
      var obj = JSON.parse(data);
      obj.push(req.body);
      console.log(obj);
      fs.writeFile(file, JSON.stringify(obj), 'utf-8', function (err) {
        if (err) return console.log(err);
        console.log('Wrote Snark');
        res.redirect('/memes');
      })
    }
  });
});


module.exports = router;