const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("mysql");
const conn = require("../config/db");

router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM score";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

router.get("/:stdid/:sublid", async (req, res, next) => {
  let sql =
    "SELECT * FROM score WHERE StdID=" +
    req.params.stdid +
    " and SubLID=" +
    req.params.sublid;
  let query = conn.query(sql, (err, results) => {
    res.send(results);
  });
});

router.get("/:stdid", async (req, res, next) => {
  let sql = "SELECT * FROM score WHERE StdID=" + req.params.stdid;
  let query = conn.query(sql, (err, results) => {
    res.send(results);
  });
});

router.get("/leaderboard", async (req, res) => {
  let sql =
    "select  students.StdID,NickName, sum(score) from score,students Where score.StdID=students.StdID group by students.StdID";
  let query = conn.query(sql, (err, results) => {
    res.send(results);
  });
});

router.post("/score", async (req, res, next) => {
  let data = {
    StdID: req.body.StdID,
    SubLID: req.body.SubLID,
    Score: req.body.Score,
  };
  let sql = "INSERT INTO score SET ?";
  let query = await conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
module.exports = router;
