var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Superhero = require('./models/Superhero');
var app = express();
var port = 3000;

mongoose.connect('mongodb://localhost/superheroes');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

//link html, css, and js Files
app.use(express.static(__dirname + '/public'));

//get all Superheroes route
app.get('/api', function(req, res){
  Superhero.find(function(err, superheroes){
    if (err) throw err;
    res.json({
      data: superheroes,
      message: "Heroes successfully retrieved :) "
    });
  });
});

//get single Superhero route
app.get("/api/:_id", function(req, res){
  Superhero.findById(req.params._id, function(err, superhero){
    if (err) throw err;
    res.json({
      data: superhero,
      message: "Hero retrieved!"
    });
  });
});

//post new Superhero to database
app.post('/api', function(req, res) {
  console.log("Hitting Post Route");
  var superhero = new Superhero();
  superhero.name = req.body.name;
  superhero.superpower = req.body.superpower;
  superhero.img = req.body.img;

  superhero.save().then(function(superhero) {
    res.json({
      message: "Hero Successfully Created!",
      data: superhero
    });
  }, function(err) {
    res.send("Failed to save :( ")
  })
});

//make sure app is actually running
var server = app.listen(port, function(){
  console.log("Listening on port", port);
});
