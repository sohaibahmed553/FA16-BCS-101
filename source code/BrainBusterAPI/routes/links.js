const express = require("express");
const router = express.Router();
const conn = require("../config/db");
const { check, validationResult } = require("express-validator");

//@route Get api/links
//@desc get all links
//@access Public
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM links";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

//@route GET api/links/:stid
//@desc Get Links by passing Stage
//@access Public
router.get("/:stid", async (req, res) => {
  conn.query(
    "SELECT * FROM `links` WHERE `StID` = ? ",
    [req.params.stid],
    (err, results) => {
      res.send(results);
    }
  );
});

//@route Post api/links
//@desc add new link
//@access Public
router.post(
  "/",
  [
    check("link", "Please enter link.")
      .not()
      .isEmpty(),
    check("stage", "Please select stage.")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      Link: req.body.link,
      StID: req.body.stage
    };

    try {
      let sql = "Insert into links set ?";
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

//@route Put api/links/:id
//@desc update link by passing id
//@access Public
router.put(
  "/:id",
  [
    check("link", "Please enter link.")
      .not()
      .isEmpty(),
    check("stage", "Please select stage.")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      Link: req.body.link,
      StID: req.body.stage
    };

    try {
      let sql = "UPDATE links set ? WHERE LinkID = ?";
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

//@route DELETE api/links/:id
//@desc Delete Link
//@access Public

router.delete("/:id", async (req, res) => {
  conn.query(
    "Delete FROM `links` WHERE LinkID = ?",
    req.params.id,
    (err, results) => {
      res.send(results);
    }
  );
});

module.exports = router;
