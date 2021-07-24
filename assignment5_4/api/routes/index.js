const express = require('express');
const studentController = require('../controllers/students-controllers');
const courseController = require('../controllers/courses-controllers');

const router = express.Router();

router
  .route('/students')
  .get(studentController.getAllStudents)
  .post(studentController.addStudent);

router
  .route('/students/:studentId')
  .get(studentController.getOneStudent)
  .put(studentController.updateFullStudentOne)
  .patch(studentController.updatePartialStudentOne)
  .delete(studentController.deleteStudent);

router
  .route('/students/:studentId/courses')
  .get(courseController.getStudentCourses)
  .post(courseController.addCourse);

router
  .route('/students/:studentId/courses/:courseId')
  .get(courseController.getStudentOneCourse)
  .put(courseController.updateFullOneCourse)
  .patch(courseController.updatePartialOneCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
