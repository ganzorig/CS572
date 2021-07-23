const mongoose = require('mongoose');
const Student = mongoose.model('Student');

// GET ALL
module.exports.getAllStudents = function (req, res) {
  let count = 5;
  let offset = 0;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  Student.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, students) {
      res.status(200).json(students);
    });
};

// GET ONE
module.exports.getOneStudent = function (req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId).exec(function (err, student) {
    res.status(200).json(student);
  });
};

// GET COURSES
module.exports.getStudentCourses = function (req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .select('courses')
    .exec(function (err, student) {
      res.status(200).json(student.courses);
    });
};

// GET ONE COURSE
module.exports.getStudentOneCourse = function (req, res) {
  const studentId = req.params.studentId;
  const courseCode = req.params.courseCode;

  Student.findById(studentId)
    .select('courses')
    .exec(function (err, student) {
      const course = student.courses.find((c) => c.code === courseCode);
      res.status(200).json(course);
    });
};
