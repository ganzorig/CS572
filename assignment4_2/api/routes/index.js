const express = require('express');
const studentController = require('../controllers/students-controllers');

const router = express.Router();

router.route('/students').get(studentController.getAllStudents);

router.route('/students/:studentId').get(studentController.getOneStudent);

router
  .route('/students/:studentId/courses')
  .get(studentController.getStudentCourses);

router
  .route('/students/:studentId/courses/:courseCode')
  .get(studentController.getStudentOneCourse);

module.exports = router;
