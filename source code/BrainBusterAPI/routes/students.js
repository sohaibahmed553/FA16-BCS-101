const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const conn = require("../config/db");

//@route POST api/students
//@desc Register user
//@access Public
router.post(
  "/",
  [
    check("Gender", "Please select F or M.")
      .not()
      .isEmpty()
      .isLength({ max: 1 }),
    check("NickName", "Please enter a valid name.")
      .not()
      .isEmpty(),
    check("UserName", "Please enter a valid name.")
      .not()
      .isEmpty(),
    // username must be an email
    check("Email", "Please enter a valid email.").isEmail(),
    // password must be at least 5 chars long
    check("Pass", "Enter password of atleast 6 characters.").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();

    let data = {
      Gender: req.body.Gender,
      Email: req.body.Email,
      UserName: req.body.UserName,
      NickName: req.body.NickName,
      Pass: req.body.Pass,
      RegDate: year + "-" + month + "-" + date
    };

    try {
      //check if user exists
      conn.query(
        "SELECT * FROM `students` WHERE `Email` = ? or `UserName` = ?",
        [data.Email, data.UserName],
        async (err, results) => {
          if (results.length) {
            return res
              .status(400)
              .json({ error: [{ msg: "Username or Email already exists" }] });
          } else {
            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            data.Pass = await bcrypt.hash(data.Pass, salt);

            let sql = "INSERT INTO students SET ?";
            conn.query(sql, data, async (err, results) => {
              if (err) throw err;
              res.send(results);
            });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/students", async (req, res, next) => {
  let sql = "SELECT * FROM Students";
  let query = await conn.query(sql, (err, results) => {
    res.send(results);
  });
});

router.get("/:id", async (req, res, next) => {
  let sql = "SELECT * FROM Students WHERE StdID = ?";
  let query = conn.query(sql, [req.params.id], (err, results) => {
    res.send(results);
  });
});

module.exports = router;
