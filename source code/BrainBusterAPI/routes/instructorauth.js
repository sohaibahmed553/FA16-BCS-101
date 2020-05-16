const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const instructorauth = require("../middleware/instructorauth");
const conn = require("../config/db");

router.get("/", instructorauth, async (req, res) => {
  try {
    conn.query(
      "SELECT InstructorID,Gender,Email,UserName,NickName,RegDate FROM `instructors` WHERE `InstructorID` = ?",
      [req.instructor.InstructorID],
      async (err, results) => {
        res.json(results);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/instructorauth
//@desc Authenticate instructor and get token
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
        "SELECT * FROM `instructors` WHERE `UserName` = ?",
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
              instructor: {
                InstructorID: results[0].InstructorID,
              },
            };

            jwt.sign(
              payload,
              config.get("jwtSecret"),
              { expiresIn: 3600000 },
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

//@route PUT api/instructorauth/:instructorid
//@desc Update Instructor
//@access Public
router.put(
  "/:instructorid",
  [
    check("Gender", "Please select F or M.")
      .not()
      .isEmpty()
      .isLength({ max: 1 }),
    check("NickName", "Please enter a valid name.").not().isEmpty(),
    // username must be an email
    check("Email", "Please enter a valid email.").isEmail(),
    // password must be at least 5 chars long
    check("Pass", "Enter password of atleast 6 characters.").isLength({
      min: 6,
    }),
  ],
  instructorauth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let data = {
      Gender: req.body.Gender,
      Email: req.body.Email,
      NickName: req.body.NickName,
      Pass: req.body.Pass,
    };

    try {
      const salt = await bcrypt.genSalt(10);
      data.Pass = await bcrypt.hash(data.Pass, salt);

      let sql = "UPDATE instructors set ? WHERE InstructorID = ?";
      let query = await conn.query(
        sql,
        [data, req.params.instructorid],
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
