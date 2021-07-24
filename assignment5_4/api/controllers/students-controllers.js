const mongoose = require('mongoose');
const Student = mongoose.model('Student');

// GET ALL
module.exports.getAllStudents = function (req, res) {
  const response = {};
  let count = 5;
  let offset = 0;

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (isNaN(count) || isNaN(offset)) {
    response.status = 400;
    response.message = { message: 'Offset and Count values should be numbers' };
  }

  Student.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, students) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = students;
      }

      res.status(response.status).json(response.message);
    });
};

// GET ONE
module.exports.getOneStudent = function (req, res) {
  const studentId = req.params.studentId;

  Student.findById(studentId).exec(function (err, student) {
    const response = {
      status: 200,
      message: student,
    };

    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 400;
      response.message = { message: 'Student not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addStudent = function (req, res) {
  console.log('POST add new student');

  const newStudent = {
    name: req.body.name,
    gpa: parseFloat(req.body.gpa),
    courses: [],
  };

  Student.create(newStudent, function (err, createResponse) {
    const response = {
      status: 200,
      message: createResponse,
    };

    if (err) {
      console.log(newStudent);
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

// UPDATE
const _updateStudentProperties = function (req, student, isFullUpdate) {
  if (isFullUpdate) {
    student.name = req.body.name;
    student.gpa = parseFloat(req.body.gpa);
    student.courses = student.courses;
  } else {
    if (req.body.name) {
      student.name = req.body.name;
    }
    if (req.body.gpa) {
      student.gpa = parseFloat(req.body.gpa);
    }
    student.courses = student.courses;
  }
};

const _updateStudent = function (req, res, isFullUpdate) {
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
      _updateStudentProperties(req, student, isFullUpdate);

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
    }
  });
};

module.exports.updateFullStudentOne = function (req, res) {
  console.log('PUT one student json');
  _updateStudent(req, res, true);
};

module.exports.updatePartialStudentOne = function (req, res) {
  console.log('PATCH one student json');
  _updateStudent(req, res, false);
};

// DELETE
module.exports.deleteStudent = function (req, res) {
  console.log('DELETE one student json');
  const studentId = req.params.studentId;

  Student.findByIdAndDelete(studentId).exec(function (err, deletedStudent) {
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!deletedStudent) {
      response.status = 404;
      response.message = { message: 'Student not found given ID' };
    }
    res.status(response.status).json(response.message);
  });
};
