const {getAllCoursesHandler, addHoursTakenHandler} = require('../controller/courseController');
const express = require('express');
const courseRouter = express.Router();
const { verifyToken } = require('../middleware/jwt');

courseRouter.get('/courses/all', verifyToken ,getAllCoursesHandler);
courseRouter.post('/courses/add-hours', verifyToken ,addHoursTakenHandler);

module.exports = courseRouter;