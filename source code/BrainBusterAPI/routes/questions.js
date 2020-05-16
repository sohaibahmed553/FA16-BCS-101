const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("mysql");
const { check, validationResult } = require("express-validator");

const conn = require("../config/db");

router.get("/", async (req, res, next) => {
	let sql = "SELECT * FROM questions";
	let query = await conn.query(sql, (err, results) => {
		res.send(results);
	});
});

//@route GET api/questions/:StID
//@desc Get Questions randomly by passing Stage and dificulty
//@access Public
router.get("/:stid", async (req, res, next) => {
	var easyQuestions = [];
	var medQuestions = [];
	var hardQuestions = [];
	let sql1 = "SELECT * FROM Questions where StID=? and Difficulty=1 order BY RAND() limit 10";
	let sql2 = "SELECT * FROM Questions where StID=? and Difficulty=2 order BY RAND() limit 10";
	let sql3 = "SELECT * FROM Questions where StID=? and Difficulty=3 order BY RAND() limit 10";
	conn.query(sql1, [req.params.stid], (err, results) => {
		easyQuestions = results;
	});
	conn.query(sql2, [req.params.stid], (err, results) => {
		medQuestions = results;
	});
	conn.query(sql3, [req.params.stid], (err, results) => {
		hardQuestions = results;
		res.send([...easyQuestions, ...medQuestions, ...hardQuestions]);
	});
});

//@route GET api/questions/show/:StID/:difficulty
//@desc Get Questions by passing Stage and dificulty
//@access Public
router.get("/show/:stid/:difficulty", async (req, res, next) => {
	conn.query(
		"SELECT * FROM `questions` WHERE `StID` = ? and `Difficulty` = ?",
		[req.params.stid, req.params.difficulty],
		(err, results) => {
			res.send(results);
		}
	);
});

//@route POST api/questions/:StID
//@desc Add Question
//@access Public
router.post(
	"/",
	[
		check("question", "Please enter a question.").not().isEmpty(),
		check("a", "Please enter first option.").not().isEmpty(),
		check("b", "Please enter second option.").not().isEmpty(),
		check("c", "Please enter third option.").not().isEmpty(),
		check("d", "Please enter fourth option.").not().isEmpty(),
		check("answer", "Please select answer.").not().isEmpty().isLength({ max: 1 }),
		check("explanation", "Please enter explanation of answer.").not().isEmpty(),
		check("difficulty", "Please enter difficulty of question.").not().isEmpty().isLength({ max: 1 }),
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
			Explanation: req.body.explanation,
			Difficulty: req.body.difficulty,
			StID: req.body.stage,
		};

		try {
			let sql = "INSERT INTO questions SET ?";
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

//@route PUT api/questions/:QID
//@desc Update Question
//@access Public
router.put(
	"/:qid",
	[
		check("question", "Please enter a question.").not().isEmpty(),
		check("a", "Please enter first option.").not().isEmpty(),
		check("b", "Please enter second option.").not().isEmpty(),
		check("c", "Please enter third option.").not().isEmpty(),
		check("d", "Please enter fourth option.").not().isEmpty(),
		check("answer", "Please select answer.").not().isEmpty().isLength({ max: 1 }),
		check("explanation", "Please enter explanation of answer.").not().isEmpty(),
		check("difficulty", "Please enter difficulty of question.").not().isEmpty().isLength({ max: 1 }),
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
			Explanation: req.body.explanation,
			Difficulty: req.body.difficulty,
			StID: req.body.stage,
		};

		try {
			let sql = "UPDATE questions set ? WHERE qid = ?";
			let query = await conn.query(sql, [data, req.params.qid], (err, results) => {
				if (err) throw err;
				res.send(results);
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

//@route DELETE api/questions/:QID
//@desc Delete Question
//@access Public

router.delete("/:qid", async (req, res) => {
	conn.query("Delete FROM `questions` WHERE QID = ?", req.params.qid, (err, results) => {
		res.send(results);
	});
});

module.exports = router;
