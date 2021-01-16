const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.createPublisher = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function(err, game){
    const response = {
      status: 201
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!game) {
      response.status = 404;
      response.message = {message: "Game Id is not found"}
    } else {
      const publisher = {
        name: req.body.name,
        location: {
          address: req.body.address,
          coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
        }
      }
      game.publisher = publisher;
      game.save(function(updateErr, updatedGame){
        if(updateErr) {
          response.status = 500;
          response.message = updateErr;
        } else {
          response.message = updatedGame;
        }
      });
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getPublisher = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function(err, game){
    const response = {
      status: 200
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!game) {
      response.status = 404;
      response.message = {message: "Game Id is not found"}
    } else {
      response.message = game.publisher ? game.publisher : [];
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.updatePublisher = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function(err, game){
    const response = {
      status: 204
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!game) {
      response.status = 404;
      response.message = {message: "Game Id is not found"}
    } else {
      const publisher = {
        name: req.body.name,
        location: {
          address: req.body.address,
          coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
        }
      }
      game.publisher = publisher;
      game.save(function(updateErr, updatedGame){
        if(updateErr) {
          response.status = 500;
          response.message = updateErr;
        } else {
          response.message = updatedGame;
        }
      });
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.deletePublisher = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function(err, game){
    const response = {
      status: 204,
      message: "Deleted publisher successfully."
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!game) {
      response.status = 404;
      response.message = {message: "Game Id is not found"}
    } else {
      game.publisher.remove();
      game.save(function(deletedErr, updatedGame){
        if (deletedErr) {
          response.status = 500;
          response.message = deletedErr;
        }
      })
    }
    res.status(response.status).json(response.message);
  })
}