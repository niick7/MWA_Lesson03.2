const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const message404 = "Student Id is not found.";

module.exports.getAddresses = function(req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function(err, student){
    const response = { status: 200 }
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!student) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      response.message = student.addresses ? student.addresses : []
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.createAddress = function(req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function(err, student){
    const response = { status: 201 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!student) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      const address = {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: parseInt(req.body.zip)
      }
      Student.updateOne({_id: student._id}, {$push: {addresses: address}}, function(addedErr, updatedStudent){
        if (addedErr) {
          response.status = 500;
          response.message = addedErr;
        } else {
          response.message = updatedStudent;
        }
      })
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.getAddress = function(req, res) {
  const studentId = req.params.studentId;
  const addressId = req.params.addressId;
  Student.findById(studentId).exec(function(err, student){
    const response = { status: 200 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!student) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      const address = student.addresses.id(addressId);
      if (!address) {
        response.status = 404;
        response.message = { message: "Address Id is not found" };
      } else {
        response.message = address;
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.updateAddress = function(req, res) {
  const studentId = req.params.studentId;
  const addressId = req.params.addressId;
  Student.findById(studentId).exec(function(err, student){
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!student) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      let address = student.addresses.id(addressId);
      if (!address) {
        response.status = 404;
        response.message = { message: "Address Id is not found" };
      } else {
        Student.updateOne(
          { _id: student._id, "addresses._id": addressId}, 
          { $set: {
              "addresses.$.street": req.body.street,
              "addresses.$.city": req.body.city,
              "addresses.$.state": req.body.state,
              "addresses.$.zip": parseInt(req.body.zip)
            }
          }, function(addedErr, updatedStudent){
          if (addedErr) {
            response.status = 500;
            response.message = addedErr;
          } else {
            response.message = updatedStudent;
          }
        })
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.deleteAddress = function(req, res) {
  const studentId = req.params.studentId;
  const addressId = req.params.addressId;
  Student.findById(studentId).exec(function(err, student){
    const response = { status: 204 };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!student) {
      response.status = 404;
      response.message = { message: message404 };
    } else {
      let address = student.addresses.id(addressId);
      if (!address) {
        response.status = 404;
        response.message = { message: "Address Id is not found" };
      } else {
        Student.updateOne(
          { _id: student._id }, 
          { $pull: {
              addresses: {_id: addressId}
            }
          }, function(addedErr, updatedStudent){
          if (addedErr) {
            response.status = 500;
            response.message = addedErr;
          } else {
            response.message = updatedStudent;
          }
        })
      }
    }
    res.status(response.status).json(response.message);
  })
}