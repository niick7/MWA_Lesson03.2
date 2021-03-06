const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games_controller");
const publisherController = require("../controllers/publisher_controller");

router.route("/games").get(gamesController.getGames)
                      .post(gamesController.createGame);
router.route("/games/:gameId").get(gamesController.getGame)
                              .put(gamesController.updateGame)
                              .delete(gamesController.deleteGame);
router.route("/games/:gameId/publisher").get(publisherController.getPublisher)
                                        .post(publisherController.createPublisher)
                                        .put(publisherController.updatePublisher)
                                        .delete(publisherController.deletePublisher);

module.exports = router;