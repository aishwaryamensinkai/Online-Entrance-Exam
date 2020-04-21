const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");

const Student = mongoose.model("Student");

module.exports.sregister = (req, res, next) => {
  var student = new Student({
    fullName: req.body.fullName,
    gender: req.body.gender,
    email: req.body.email,
    age: req.body.age,
    marks: req.body.marks,
    address: req.body.address,
    contactno: req.body.contactno,
    qualification: req.body.qualification,
  });
  student.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(["Duplicate Email or contactno found."]);
      else return next(err);
    }
    // else {
    //   console.log(
    //     "Error in Student Save :" + JSON.stringify(err, undefined, 2)
    //   );
    // }
  });
};

module.exports.studentProfile = (req, res, next) => {
  Student.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Students :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
};
