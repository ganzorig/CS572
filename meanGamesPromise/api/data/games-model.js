const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

const publisherSchema = new mongoose.Schema({
  name: String,
  country: String,
  location: pointSchema,
});

const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  date: Date,
});

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  maxPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  minAge: Number,
  designers: [String],
  publisher: publisherSchema,
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

mongoose.model('Game', gameSchema, 'games');
