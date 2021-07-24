const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: String,
  teacher: String,
  credit: Number,
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gpa: Number,
  courses: [courseSchema],
});

mongoose.model('Student', studentSchema, 'Students');
