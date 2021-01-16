const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    require: true
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    "default": 1
  },
  minPlayers: {
    type: Number,
    "default": 1
  },
  maxPlayers: {
    type: Number,
    "default": 2
  },
  minAge: {
    type: Number,
    "default": 8
  },
  year: {
    type: Number,
    "default": 1998
  },
  designers: {
    type: String,
    "default": ""
  }
})

mongoose.model("Game", gameSchema, "games");