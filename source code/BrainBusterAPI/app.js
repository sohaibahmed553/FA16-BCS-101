var express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var instructorRouter = require("./routes/instructor");
var instructorCoursesRouter = require("./routes/instructorcourses");
var adminRouter = require("./routes/admin");
var studentRouter = require("./routes/students");
var questionsRouter = require("./routes/questions");
var challengesRouter = require("./routes/challenges");
var scoresRouter = require("./routes/score");
var stagesRouter = require("./routes/stages");
var badgesRouter = require("./routes/badges");
var linksRouter = require("./routes/links");
var coursesRouter = require("./routes/courses");
var authRouter = require("./routes/auth");
var adminAuthRouter = require("./routes/adminauth");
var instructorAuthRouter = require("./routes/instructorauth");

var app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/students", studentRouter);
app.use("/api/instructors", instructorRouter);
app.use("/api/instructorcourses", instructorCoursesRouter);
app.use("/api/admins", adminRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/challenges", challengesRouter);
app.use("/api/scores", scoresRouter);
app.use("/api/stages", stagesRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/auth", authRouter);
app.use("/api/adminauth", adminAuthRouter);
app.use("/api/instructorauth", instructorAuthRouter);
app.use("/api/badges", badgesRouter);
app.use("/api/links", linksRouter);

app.listen(4000, () => {
  console.log("Server started on port 4000...");
});

const conn = require("./config/db");
