const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");

var ObjectId = require("mongoose").Types.ObjectId;
const Student = mongoose.model("Student");

const ctrlStudent = require("../controllers/student.controller");

router.post("/sregister", ctrlStudent.sregister);
router.get("/studentProfile", ctrlStudent.studentProfile);

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  Student.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving Student :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
module.exports = router;
