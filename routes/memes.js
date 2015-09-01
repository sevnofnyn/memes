var express = require('express');
var router = express.Router();
var fs= require('fs');
var path = require('path');
var memes = require('../models/memes');
var snark = require('../models/snark');

snark = JSON.stringify(snark);

/* GET users listing. */
router.get('/', function(req, res, next) {// when it hits the /memes path, it renders memes.jade

  res.render('memes', {'memesObject': memes, 'comments': snark}); //the stuff inside the {} is for dynamic things. if we wanted it just static we would leave it 'memes'

});

router.get('/snark', function(req, res, next){// this is necessary for the ajax/javascript call that is going to get the objects from the snark.json to give to the jquery running on the  browser
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
  fs.readFile(file, 'utf8', function (err, data) {//opening up the snark database
    if (err) {
      next(err);
    }
    else {//this is our post route to put snarky comment from user
      var obj = JSON.parse(data);//we are turning the database into a JS array
      obj.push(req.body);//we are pushing the request onto the end of the array as a new snarky comment
      console.log(obj);
      fs.writeFile(file, JSON.stringify(obj), 'utf-8', function (err) {//this saves it by writing a file that saves it back to snark.json, json stringify takes it out of being an array and back to json
        if (err) return console.log(err);
        console.log('Wrote Snark');
        res.redirect('/memes');//this refreshes our page to append the new comment to the appropriate image and sends us back to the first router.get
      })
    }
  });
});


module.exports = router;