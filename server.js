var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Superhero = require('./models/Superhero');
//var mainRoutes = require('./routes/main'); //node assumes that files are .js
var heroRoutes = require('./routes/superheroes');
var app = express();
var port = 3000;

mongoose.connect('mongodb://localhost/superheroes');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use('/api/main', mainRoutes);

app.use('/api/heroes', heroRoutes);

//link html, css, and js Files
app.use(express.static(__dirname + '/public'));

// get single Superhero route
app.get("/api/:_id", function(req, res){
  Superhero.findById(req.params._id, function(err, superhero){
    if (err) throw err;
    res.json({
      data: superhero,
      message: "Hero retrieved!"
    });
  });
});

// app.delete('api/heroes/:_id', function(req, res){
//   Superhero.remove({
//     _id: req.params._id
//   })
// })

//make sure app is actually running
var server = app.listen(port, function(){
  console.log("Listening on port", port);
});
