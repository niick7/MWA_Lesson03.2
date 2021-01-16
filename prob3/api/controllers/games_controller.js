const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getGames = function(req, res) {
  let offset = 0;
  let count = 5;
  if(req.query) {
    if (req.query.offset)
      offset = parseInt(req.query.offset);
    if (req.query.count)
      count = parseInt(req.query.count);
  }
  if(isNaN(offset) || isNaN(count)) {
    res.status(400).json({message: "Offset and Count must be number."})
  }

  Game.find().skip(offset).limit(count).exec(function(err, games){
    const response = {
      status: 200,
      message: games
    }
    if (err) {
      response.status = 500;
      response.message = {message: err};
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createGame = function(req, res) {
  Game.create({
    title: req.body.title,
    year: parseInt(req.body.year),
    rate: parseInt(req.body.rate),
    price: parseFloat(req.body.price),
    minPlayers: parseInt(req.body.min_players),
    maxPlayers: parseInt(req.body.max_players),
    minAge: parseInt(req.body.min_age),
    designers: req.body.designers
  }, function(err, createdGame){
    response = {
      status: 201,
      message: createdGame
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getGame = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function(err, game) {
    const response = {
      status: 200,
      message: game
    }
    if (err || !game) {
      response.status = 404;
      response.message = {message: "Game Id is not found."};
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.updateGame = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function(err, game){
    let response = { status: 204 };
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!game) {
      response.status = 404;
      response.message = {message: "Game Id is not found."}
    }
    if(response.status !== 204) {
      res.status(res.status).json(response.message);
    } else {
      game.title = req.body.title;
      game.year = parseInt(req.body.year);
      game.rate = parseInt(req.body.rate);
      game.price = parseFloat(req.body.price);
      game.minPlayers = parseInt(req.body.min_players);
      game.maxPlayers = parseInt(req.body.max_players);
      game.minAge = parseInt(req.body.min_age);
      game.designers = req.body.designers;
      game.save(function(updateErr, updatedGame){
        if(updateErr) {
          response.status = 500;
          response.message = updateErr;
        } else {
          response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
      })
    }
  })
}

module.exports.deleteGame = function(req, res) {
  const gameId = req.params.gameId;
  Game.findByIdAndDelete(gameId).exec(function(err, deletedGame){
    let response = {
      status: 204,
      message: "Deleted game successfully."
    };
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!deletedGame) {
      response.status = 404;
      response.message = {message: "Game Id is not found."}
    }
    res.status(response.status).json(response.message);
  })
}