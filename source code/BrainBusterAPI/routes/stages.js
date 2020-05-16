const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("mysql");
const conn = require("../config/db");

const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM stages";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

router.get("/:courseid", async (req, res, next) => {
  let sql = "SELECT * FROM stages WHERE CourseID=" + req.params.courseid;
  let query = conn.query(sql, (err, results) => {
    res.send(results);
  });
});

//@route Post api/stages
//@desc add new stage
//@access Public
router.post(
  "/",
  [
    check("course", "Please enter course name.").not().isEmpty(),
    check("stage", "Please enter stage.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      CourseID: req.body.course,
      StTitle: req.body.stage,
    };

    try {
      let sql = "Insert into stages set ?";
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

//@route Put api/stages
//@desc update the name or course of a stage
//@access Public
router.put(
  "/:id",
  [
    check("course", "Please enter course name.").not().isEmpty(),
    check("stage", "Please enter stage.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      CourseID: req.body.course,
      StTitle: req.body.stage,
    };

    try {
      let sql = "Update Stages set ? where StID=?";
      let query = await conn.query(
        sql,
        [data, req.params.id],
        (err, results) => {
          if (err) throw err;
          res.send(results);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
