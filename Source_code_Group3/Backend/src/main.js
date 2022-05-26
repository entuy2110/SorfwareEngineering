const express = require('express');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const subjectsRouter = require('./routes/subjects');
const userCourseRouter = require('./routes/usercourses');
const contentsRouter = require('./routes/contents');
const assignmentsRouter = require('./routes/assignments');
const documentsRouter = require('./routes/documents');
const submissionsRouter = require('./routes/submissions');

const app = express();
var cors = require('cors')
app.use(cors())
const {init} = require('./db');

app.use(express.json());


app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/subjects', subjectsRouter);
app.use('/usercourses', userCourseRouter);
app.use('/contents', contentsRouter);
app.use('/assignments', assignmentsRouter);
app.use('/documents', documentsRouter);
app.use('/submissions', submissionsRouter);


init().then(function() {
  app.listen(8000, function() {
    console.log("App started at port 8000");
  });
});
