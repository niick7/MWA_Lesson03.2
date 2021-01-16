const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students_controller");
const addressesController = require("../controllers/addresses_controller");

router.route("/students").get(studentsController.getStudents)
                      .post(studentsController.createStudent);
router.route("/students/:studentId").get(studentsController.getStudent)
                              .put(studentsController.updateStudent)
                              .delete(studentsController.deleteStudent);
router.route("/students/:studentId/addresses").get(addressesController.getAddresses)
                                      .post(addressesController.createAddress);
router.route("/students/:studentId/addresses/:addressId").get(addressesController.getAddress)
                                                         .put(addressesController.updateAddress)
                                                         .delete(addressesController.deleteAddress);

module.exports = router;