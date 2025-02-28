const weeklyScheduleModel = require('../model/weeklySchedule');
const { sequelize } = require('../config/db');
const { Op } = require('sequelize');

const WeeklyScheduleModel = weeklyScheduleModel(sequelize);

const getWeeklyScheduleByCourseName = async (courseName) => {
    try {
        const weeklySchedule = await WeeklyScheduleModel.findAll({
            where: {
                courseName,
                createdAt: {
                    [Op.lt]: new Date('2025-02-27')
                }
            }
        });
        return weeklySchedule;
    } catch (error) {
        console.error('Error occurred while retrieving weekly schedule by course name:', error);
        throw error;
    }
};

const getWeeklyScheduleByCourseNameRamadan = async (courseName) => {
    try {
        const weeklySchedule = await WeeklyScheduleModel.findAll({
            where: {
                courseName,
                createdAt: new Date('2025-02-28')
            }
        });
        return weeklySchedule;
    } catch (error) {
        console.error('Error occurred while retrieving weekly schedule by course name:', error);
        throw error;
    }
};

module.exports = { getWeeklyScheduleByCourseName, getWeeklyScheduleByCourseNameRamadan };