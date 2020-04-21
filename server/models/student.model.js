const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "Full name can't be empty",
  },
  gender: {
    type: String,
    required: "Gender can't be empty",
  },
  email: {
    type: String,
    required: "Email can't be empty",
    unique: true,
  },
  age: {
    type: Number,
    max: 30,
    required: "Age can't be empty and should be <30",
  },
  marks: {
    type: Number,
    min: 70,
    max: 100,
    required: "Marks has to be >70 & <100 and is required.",
  },
  address: {
    type: String,
    required: "Address can't be empty",
  },
  contactno: {
    type: Number,
    required: "Contact No can't be empty",
  },
  qualification: {
    type: String,
    required: "Qualification can't be empty",
  },
  saltSecret: String,
});

// Custom validation for email
studentSchema.path("email").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

studentSchema.path("contactno").validate((val) => {
  contactnoRegex = /^\d{3}\d{3}\d{4}$/;
  return contactnoRegex.test(val);
}, "Invalid Contact Number.");

// Events
studentSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
studentSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

mongoose.model("Student", studentSchema);
