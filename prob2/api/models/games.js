const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

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
  },
  publisher: publisherSchema
})

mongoose.model("Game", gameSchema, "games");