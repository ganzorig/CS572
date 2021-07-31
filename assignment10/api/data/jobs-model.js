const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  country: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  nameOfReviewer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.Now,
  },
});

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  location: pointSchema,
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  postDate: {
    type: Date,
    default: Date.Now,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

mongoose.model('Jobs', jobSchema, 'jobs');
