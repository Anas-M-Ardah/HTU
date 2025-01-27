const {getWeeklyScheduleByCourseName} = require('../service/weeklyScheduleServices');

const getWeeklyScheduleHandler = async (req, res) => {
    try {
        const { courseName } = req.params;
        const weeklySchedule = await getWeeklyScheduleByCourseName(courseName);
        res.status(200).json(weeklySchedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getWeeklyScheduleHandler };