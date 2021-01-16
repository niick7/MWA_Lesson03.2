const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games_controller");
const publisherController = require("../controllers/publisher_controller");
const reviewsController = require("../controllers/reviews_controller");

router.route("/games").get(gamesController.getGames)
                      .post(gamesController.createGame);
router.route("/games/:gameId").get(gamesController.getGame)
                              .put(gamesController.createGame)
                              .delete(gamesController.deleteGame);
router.route("/games/:gameId/publisher").get(publisherController.getPublisher)
                                        .post(publisherController.createPublisher)
                                        .put(publisherController.updatePublisher)
                                        .delete(publisherController.deletePublisher);
router.route("/games/:gameId/reviews").get(reviewsController.getReviews)
                                      .post(reviewsController.createReview);
router.route("/games/:gameId/reviews/:reviewId").get(reviewsController.getReview)
                                                .put(reviewsController.updateReview)
                                                .delete(reviewsController.deleteReview);

module.exports = router;