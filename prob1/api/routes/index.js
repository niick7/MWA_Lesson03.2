const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games_controller");

router.route("/games").get(gamesController.getGames)
                      .post(gamesController.createGame);
router.route("/games/:gameId").get(gamesController.getGame)
                              .put(gamesController.createGame)
                              .delete(gamesController.deleteGame);

module.exports = router;