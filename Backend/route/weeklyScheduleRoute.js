const {getWeeklyScheduleHandler, getWeeklyScheduleHandlerRamadan} = require('../controller/weeklyScheduleController');
const express = require('express');
const { verifyToken } = require('../middleware/jwt');

const weeklyScheduleRouter = express.Router();

weeklyScheduleRouter.get('/weekly-schedule/:courseName', verifyToken ,getWeeklyScheduleHandler);
weeklyScheduleRouter.get('/weekly-schedule-ramadan/:courseName', verifyToken ,getWeeklyScheduleHandlerRamadan);

module.exports = weeklyScheduleRouter;
