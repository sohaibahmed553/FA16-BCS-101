const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("mysql");
const { check, validationResult } = require("express-validator");

const conn = require("../config/db");

router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM challenges";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

//@route GET api/challenges/:StID
//@desc Get Questions randomly by passing Stage and dificulty
//@access Public
router.get("/:stid", async (req, res, next) => {
  let sql = "SELECT * FROM Challenges where StID=? order BY RAND() limit 10";

  conn.query(sql, [req.params.stid], (err, results) => {
    res.send(results);
  });
});

//@route GET api/challenges/show/:StID
//@desc Get Questions by passing Stage
//@access Public
router.get("/show/:stid", async (req, res, next) => {
  conn.query(
    "SELECT * FROM `challenges` WHERE `StID` = ?",
    [req.params.stid],
    (err, results) => {
      res.send(results);
    }
  );
});

//@route POST api/challenges/:StID
//@desc Add Challenge
//@access Public
router.post(
  "/",
  [
    check("question", "Please enter a question.").not().isEmpty(),
    check("a", "Please enter first option.").not().isEmpty(),
    check("b", "Please enter second option.").not().isEmpty(),
    check("c", "Please enter third option.").not().isEmpty(),
    check("d", "Please enter fourth option.").not().isEmpty(),
    check("answer", "Please select answer.")
      .not()
      .isEmpty()
      .isLength({ max: 1 }),
    check("stage", "Please enter stage.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      Questions: req.body.question,
      A: req.body.a,
      B: req.body.b,
      C: req.body.c,
      D: req.body.d,
      Answer: req.body.answer,
      StID: req.body.stage,
    };

    try {
      let sql = "INSERT INTO challenges SET ?";
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

//@route PUT api/challenges/:QID
//@desc Update Challenge
//@access Public
router.put(
  "/:qid",
  [
    check("question", "Please enter a question.").not().isEmpty(),
    check("a", "Please enter first option.").not().isEmpty(),
    check("b", "Please enter second option.").not().isEmpty(),
    check("c", "Please enter third option.").not().isEmpty(),
    check("d", "Please enter fourth option.").not().isEmpty(),
    check("answer", "Please select answer.")
      .not()
      .isEmpty()
      .isLength({ max: 1 }),
    check("stage", "Please enter stage.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      Questions: req.body.question,
      A: req.body.a,
      B: req.body.b,
      C: req.body.c,
      D: req.body.d,
      Answer: req.body.answer,
      StID: req.body.stage,
    };

    try {
      let sql = "UPDATE challenges set ? WHERE qid = ?";
      let query = await conn.query(
        sql,
        [data, req.params.qid],
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

//@route DELETE api/challenges/:QID
//@desc Delete Challenge
//@access Public

router.delete("/:qid", async (req, res) => {
  conn.query(
    "Delete FROM `challenges` WHERE QID = ?",
    req.params.qid,
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
