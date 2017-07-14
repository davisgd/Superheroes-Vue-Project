var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Superhero = require('./models/Superhero');
//var mainRoutes = require('./routes/main'); //node assumes that files are .js
var heroRoutes = require('./routes/superheroes');
var villainRoutes = require('./routes/villains');
var app = express();
var port = 3000;

mongoose.connect('mongodb://localhost/superheroes');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/heroes', heroRoutes);
app.use('/api/villains', villainRoutes);

//link html, css, and js Files
app.use(express.static(__dirname + '/public'));

//make sure app is actually running
var server = app.listen(port, function(){
  console.log("Listening on port", port);
});
