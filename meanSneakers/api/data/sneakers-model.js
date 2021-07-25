const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  review: String,
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  date: Date,
});

const imageItem = {
  type: String,
  required: 'imageUrl is required',
  match: [
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
    'Please fill a valid image address',
  ],
};

const sneakersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  brand: {
    type: String,
    trim: true,
  },
  color: String,
  releaseYear: Number,
  price: Number,
  usSize: {
    type: Number,
    min: 3,
    max: 18,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  images: {
    type: [imageItem],
    default: [],
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

mongoose.model('Sneakers', sneakersSchema, 'sneakers');
