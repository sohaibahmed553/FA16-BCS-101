const express = require("express");
const router = express.Router();
const conn = require("../config/db");
const { check, validationResult } = require("express-validator");

//@route Get api/badges
//@desc get all badges
//@access Public
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM badges";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

//@route Post api/badges
//@desc add new badge
//@access Public
router.post(
  "/",
  [
    check("BName", "Please enter badge name.")
      .not()
      .isEmpty(),
    check("BDetail", "Please enter badge detail.")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      BName: req.body.BName,
      BDetail: req.body.BDetail
    };

    try {
      let sql = "Insert into badges set ?";
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

//@route Put api/badges/:id
//@desc update badge by passing id
//@access Public
router.put(
  "/:id",
  [
    check("BName", "Please enter badge name.")
      .not()
      .isEmpty(),
    check("BDetail", "Please enter badge detail.")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      BName: req.body.BName,
      BDetail: req.body.BDetail
    };

    try {
      let sql = "UPDATE badges set ? WHERE BID = ?";
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

//@route DELETE api/badges/:id
//@desc Delete Badge
//@access Public

router.delete("/:id", async (req, res) => {
  conn.query(
    "Delete FROM `badges` WHERE BID = ?",
    req.params.id,
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
