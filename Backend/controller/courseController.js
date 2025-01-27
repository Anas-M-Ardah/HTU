const {getAllCourses, addHoursTaken} = require('../service/courseServices');

const getAllCoursesHandler = async (req, res) => {
    try {
        const allCourses = await getAllCourses();
        res.status(200).json(allCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addHoursTakenHandler = async (req, res) => {
    try {
        const { courseName, hours } = req.body;
        const updatedCourse = await addHoursTaken(courseName, hours);
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCoursesHandler, addHoursTakenHandler };