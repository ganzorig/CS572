const mongoose = require('mongoose');

const Student = mongoose.model('Student');

// GET COURSES
module.exports.getStudentCourses = function (req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId).exec(function (err, student) {
    const response = { status: 200, message: {} };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = { message: 'Student not found with ID:' + studentId };
    } else {
      response.message = student.courses ? student.courses : [];
    }
    res.status(response.status).json(response.message);
  });
};

// GET ONE COURSE
module.exports.getStudentOneCourse = function (req, res) {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  Student.findById(studentId)
    .select('courses')
    .exec(function (err, student) {
      const response = { status: 200, message: {} };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!student) {
        response.status = 404;
        response.message = {
          message: 'Student not found with ID:' + studentId,
        };
      } else {
        response.message = student.courses.id(courseId);
      }
      res.status(response.status).json(response.message);
    });
};

const _addCourse = function (req, res, student) {
  const newCourse = {
    _id: mongoose.Types.ObjectId(),
    code: req.body.code,
    name: req.body.name,
    credit: parseInt(req.body.credit),
    teacher: req.body.teacher,
  };

  student.courses.push(newCourse);

  student.save(function (err, savedStudent) {
    const response = {
      status: 201,
      message: savedStudent,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.addCourse = function (req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .select('courses')
    .exec(function (err, student) {
      const response = {
        status: 201,
        message: student,
      };

      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!student) {
        console.log('Student id not found in database', id);
        response.status = 404;
        response.message = { message: 'student ID not found' + studentId };
      }

      if (response.status === 201) {
        _addCourse(req, res, student);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

// DELETE
module.exports.deleteCourse = function (req, res) {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  console.log('DELETE one course json');

  Student.findById(studentId).exec(function (err, student) {
    const response = { status: 204 };

    if (err) {
      response.status = 500;
      response.message = err;
    }

    const course = student.courses.id(courseId);
    course.remove();

    student.save(function (err, updatedStudent) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = updatedStudent;
      }

      res.status(response.status).json(response.message);
    });
  });
};

const _updateCourseProperties = function (req, student, isFullUpdate) {
  const courseId = req.params.courseId;
  const course = student.courses.id(courseId);

  if (isFullUpdate) {
    course.name = req.body.name;
    course.code = req.body.code;
    course.credit = parseInt(req.body.credit);
    course.teacher = req.body.teacher;
  } else {
    if (req.body.name) {
      course.name = req.body.name;
    }
    if (req.body.code) {
      course.code = req.body.code;
    }
    if (req.body.credit) {
      course.credit = parseInt(req.body.credit);
    }
    if (req.body.teacher) {
      course.teacher = req.body.teacher;
    }
  }
};

const _updateCourse = function (req, res, isFullUpdate) {
  const studentId = req.params.studentId;

  Student.findById(studentId).exec(function (err, student) {
    const response = {
      status: 204,
      message: student,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 400;
      response.message = { message: 'Not found student with given ID' };
    }

    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      _updateCourseProperties(req, student, isFullUpdate);

      student.save(function (err, updateStudent) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 200;
          response.message = updateStudent;
        }

        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.updateFullOneCourse = function (req, res) {
  console.log('PUT one course json');
  _updateCourse(req, res, true);
};

module.exports.updatePartialOneCourse = function (req, res) {
  console.log('PATCH one course json');
  _updateCourse(req, res, false);
};
