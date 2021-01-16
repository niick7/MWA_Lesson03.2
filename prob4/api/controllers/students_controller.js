const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const studentIdNotFound = "Student Id is not found.";

module.exports.getStudents = function(req, res) {
  let offset = 0;
  let count = 5;
  if(req.query) {
    if (req.query.offset)
      offset = parseInt(req.query.offset);
    if (req.query.count)
      count = parseInt(req.query.count);
  }
  if(isNaN(offset) || isNaN(count)) {
    res.status(400).json({message: "Offset and Count must be number."})
  }

  Student.find().skip(offset).limit(count).exec(function(err, students){
    const response = {
      status: 200,
      message: students
    }
    if (err) {
      response.status = 500;
      response.message = {message: err};
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createStudent = function(req, res) {
  Student.create({
    name: req.body.name,
    gpa: parseFloat(req.body.gpa)
  }, function(err, createdStudent){
    response = {
      status: 201,
      message: createdStudent
    }
    if(err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getStudent = function(req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function(err, student) {
    const response = {
      status: 200,
      message: student
    }
    if (err || !student) {
      response.status = 404;
      response.message = {message: studentIdNotFound};
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.updateStudent = function(req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function(err, student){
    let response = { status: 204 };
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!student) {
      response.status = 404;
      response.message = {message: studentIdNotFound}
    }
    if(response.status !== 204) {
      res.status(res.status).json(response.message);
    } else {
      Student.update({
        name: req.body.name,
        gpa: parseFloat(req.body.gpa)
      }, function(err, updatedStudent){
        response = {
          status: 204,
          message: updatedStudent
        }
        if(err) {
          response.status = 500;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      })
    }
  })
}

module.exports.deleteStudent = function(req, res) {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId).exec(function(err, deletedStudent){
    let response = {
      status: 204,
      message: "Deleted student successfully."
    };
    if(err) {
      response.status = 500;
      response.message = err;
    }
    if(!deletedStudent) {
      response.status = 404;
      response.message = {message: studentIdNotFound}
    }
    res.status(response.status).json(response.message);
  })
}