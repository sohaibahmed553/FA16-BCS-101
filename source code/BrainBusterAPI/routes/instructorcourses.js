const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("mysql");
const conn = require("../config/db");

const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  let sql = "SELECT * FROM instructorcourses";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

//@route Get api/instructorcourses/:id
//@desc get all courses for an instructor
//@access Public
router.get("/:id", async (req, res) => {
  let sql = "SELECT * FROM instructorcourses WHERE InstructorID = ?";
  let query = conn.query(sql, [req.params.id], (err, results) => {
    res.send(results);
  });
});

//@route Post api/instructorcourses
//@desc add the instuctor for a course
//@access Public
router.post(
  "/",
  [
    check("instructorid", "Please enter instructor id.").not().isEmpty(),
    check("courseid", "Please enter course id.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      InstructorId: req.body.instructorid,
      CourseID: req.body.courseid,
    };

    try {
      let sql = "Insert into instructorcourses set ?";
      let query = await conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
