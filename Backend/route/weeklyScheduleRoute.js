const {getWeeklyScheduleHandler} = require('../controller/weeklyScheduleController');
const express = require('express');
const { verifyToken } = require('../middleware/jwt');

const weeklyScheduleRouter = express.Router();

weeklyScheduleRouter.get('/weekly-schedule/:courseName', verifyToken ,getWeeklyScheduleHandler);

module.exports = weeklyScheduleRouter;
