const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const auth = require("../middleware/auth");
const conn = require("../config/db");

router.get("/", auth, async (req, res) => {
  try {
    conn.query(
      "SELECT StdID,Gender,Email,UserName,NickName,RegDate FROM `students` WHERE `StdID` = ?",
      [req.student.StdID],
      async (err, results) => {
        res.json(results);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/auth
//@desc Authenticate student and get token
//@access Public
router.post(
  "/",
  [
    check("UserName", "Please enter a valid username.").not().isEmpty(),

    check("Pass", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { UserName, Pass } = req.body;

    try {
      //check if user exists
      conn.query(
        "SELECT * FROM `students` WHERE `UserName` = ?",
        [UserName],
        async (err, results) => {
          if (!results.length) {
            return res
              .status(400)
              .json({ error: [{ msg: "Invalid Username or Password" }] });
          } else {
            //Encrypt password
            const isMatch = await bcrypt.compare(Pass, results[0].Pass);

            if (!isMatch) {
              return res
                .status(400)
                .json({ error: [{ msg: "Invalid Username or Password" }] });
            }

            const payload = {
              student: {
                StdID: results[0].StdID,
              },
            };

            jwt.sign(
              payload,
              config.get("jwtSecret"),
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
