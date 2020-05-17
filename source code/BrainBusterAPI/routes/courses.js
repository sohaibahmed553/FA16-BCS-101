const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("mysql");
const conn = require("../config/db");

const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM courses";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

//@route Get api/courses/:id
//@desc pass instructor id and get course
//@access Public
router.get("/:id", async (req, res, next) => {
  let sql = "SELECT * FROM courses WHERE InstructorID = ?";
  let query = conn.query(sql, [req.params.id], (err, results) => {
    res.send(results);
  });
});

//@route Get api/courses/managestages/:id
//@desc pass instructor id and get course having status 0
//@access Public
router.get("/managestages/:id", async (req, res, next) => {
  let sql = "SELECT * FROM courses WHERE InstructorID = ? and status = 0";
  let query = conn.query(sql, [req.params.id], (err, results) => {
    res.send(results);
  });
});

//@route Get api/courses/stage/:StID
//@desc pass stage id and get course name
//@access Public
router.get("/stage/:StID", async (req, res) => {
  let sql =
    "select CourseName from courses where courseId = (select courseId from stages where StID = ?)";
  let query = conn.query(sql, [req.params.StID], (err, results) => {
    res.send(results);
  });
});

//@route Get api/courses/countstages/:CourseID
//@desc pass course id and get stage count
//@access Public
router.get("/countstages/:CourseID", async (req, res) => {
  let sql = "select count(StID) as totalStages from Stages where courseId = ?";
  let query = conn.query(sql, [req.params.CourseID], (err, results) => {
    res.send(results);
  });
});

//@route Get api/courses/eachstage/:CourseID
//@desc pass course id and get questions count
//@access Public
router.get("/eachstage/:CourseID", async (req, res) => {
  try {
    let sql = "select StID from Stages where courseID = ?";
    conn.query(sql, [req.params.CourseID], async (err, results) => {
      res.send(results);
    });
  } catch (err) {
    if (err) throw err;
  }
});

//@route Get api/courses/allow/:StID
//@desc pass stage and get questions count
//@access Public
router.get("/allow/:StID", async (req, res) => {
  let allow = 1;
  try {
    let sql =
      "select Difficulty, count(QID) as questions from questions where StID = ? group by Difficulty";
    conn.query(sql, [req.params.StID], async (err, results) => {
      if (results.length === 0) allow = 0;
      for (let i = 0; i < results.length; i++) {
        if (results[i].questions <= 20) allow = 0;
      }
      res.json(allow);
    });
  } catch (err) {
    if (err) throw err;
  }
});

//@route Post api/courses
//@desc add new course
//@access Public
router.post(
  "/",
  [
    check("coursename", "Please enter course name.").not().isEmpty(),
    check("status", "Please enter course status.").not().isEmpty(),
    check("instructorid", "Please enter instructorid.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      CourseName: req.body.coursename,
      Status: req.body.status,
      InstructorID: req.body.instructorid,
    };

    try {
      let sql = "Insert into courses set ?";
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

//@route Put api/courses/status/:id
//@desc update the status of course to 1
//@access Public
router.put("/status/:id", async (req, res) => {
  try {
    let sql = "Update Courses set Status = 1 where CourseID=?";
    let query = await conn.query(sql, [req.params.id], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
