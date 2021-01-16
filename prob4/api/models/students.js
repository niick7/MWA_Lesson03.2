const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  zip: {
    type: Number,
    require: true
  }
})

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  gpa: {
    type: Number,
    require: true
  },
  addresses: [addressSchema]
})

mongoose.model("Student", studentSchema, "Students");