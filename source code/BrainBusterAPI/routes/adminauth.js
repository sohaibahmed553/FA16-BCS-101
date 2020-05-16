const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const adminauth = require("../middleware/adminauth");
const conn = require("../config/db");

router.get("/", adminauth, async (req, res) => {
  try {
    conn.query(
      "SELECT AdminID,Gender,Email,UserName,NickName,RegDate FROM `admins` WHERE `AdminID` = ?",
      [req.admin.AdminID],
      async (err, results) => {
        res.json(results);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/adminauth
//@desc Authenticate admin and get token
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
        "SELECT * FROM `admins` WHERE `UserName` = ?",
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
              admin: {
                AdminID: results[0].AdminID,
                NickName: results[0].NickName,
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

//@route PUT api/adminauth/:adminid
//@desc Update Admin
//@access Public
router.put(
  "/:adminid",
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
  adminauth,
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

      let sql = "UPDATE admins set ? WHERE AdminID = ?";
      let query = await conn.query(
        sql,
        [data, req.params.adminid],
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
