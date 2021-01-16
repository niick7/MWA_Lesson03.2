const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const message404 = "Game Id is not found.";

module.exports.getReviews = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function(err, game){
    const response = { status: 200 }
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!game) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      response.message = game.reviews ? game.reviews : []
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createReview = function(req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function(err, game){
    const response = { status: 201 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!game) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      const review = {
        name: req.body.name,
        rating: parseInt(req.body.rating),
        review: req.body.review
      }
      Game.updateOne({_id: game._id}, {$push: {reviews: review}}, function(addedErr, updatedGame){
        if (addedErr) {
          response.status = 500;
          response.message = addedErr;
        } else {
          response.message = updatedGame;
        }
      })
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getReview = function(req, res) {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  Game.findById(gameId).exec(function(err, game){
    const response = { status: 200 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!game) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      const review = game.reviews.id(reviewId);
      if (!review) {
        response.status = 404;
        response.message = { message: "Review Id is not found" };
      } else {
        response.message = review;
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.updateReview = function(req, res) {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  Game.findById(gameId).exec(function(err, game){
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!game) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      let review = game.reviews.id(reviewId);
      if (!review) {
        response.status = 404;
        response.message = { message: "Review Id is not found" };
      } else {
        Game.updateOne(
          { _id: game._id, "reviews._id": reviewId}, 
          { $set: {
              "reviews.$.name": req.body.name,
              "reviews.$.rating": parseInt(req.body.rating),
              "reviews.$.review": req.body.review
            }
          }, function(addedErr, updatedGame){
          if (addedErr) {
            response.status = 500;
            response.message = addedErr;
          } else {
            response.message = updatedGame;
          }
        })
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.deleteReview = function(req, res) {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  Game.findById(gameId).exec(function(err, game){
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!game) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      let review = game.reviews.id(reviewId);
      if (!review) {
        response.status = 404;
        response.message = { message: "Review Id is not found" };
      } else {
        Game.updateOne(
          { _id: game._id }, 
          { $pull: {
              reviews: {_id: reviewId}
            }
          }, function(addedErr, updatedGame){
          if (addedErr) {
            response.status = 500;
            response.message = addedErr;
          } else {
            response.message = updatedGame;
          }
        })
      }
    }
    res.status(response.status).json(response.message);
  })
}