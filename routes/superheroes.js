var express = require('express');
var Router = express.Router();
var Superhero = require('../models/Superhero');

Router.route('/')
  .get(function(req, res){
    Superhero.find(function(err, superheroes){
      if(err){
        res.send(err);
      }else{
        res.json({
          data: superheroes
        });
      }
    })
  })
  .post(function(req, res){
    console.log('Hitting the superhero post route');
    var superhero = new Superhero();
    superhero.name = req.body.name;
    superhero.superpower = req.body.superpower;
    superhero.img = req.body.img;

    superhero.save(function(erro, superhero){
      if(err){
        res.send("B to the ROKEN", err);
      }else{
        res.json({
          message: "Superhero successfully saved!",
          data: superheroes
        })
      }
    })
  })

Router.route('/:_id')
  .get(function(req, res){
    Superhero.findById(req.params._id, function(err, superhero){
      if(err){
        res.send(err, "He's dead, Jim. X(");
      }else{
        res.json({
          message: "Superhero received.",
          data: superhero
        })
      }
    })
  })
  .delete(function(req, res){
    Superhero.remove({ _id: req.params._id  },
    function(err){
      if(err){
        res.send(err, "Uh oh, it broke.");
      }else {
        res.send("Superhero was deleted!");
      }
    })
  })

module.exports = Router;
