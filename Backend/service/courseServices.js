const Course = require('../model/courses');
const { sequelize } = require('../config/db');

const CourseModel = Course(sequelize); 

const getAllCourses = async () => {
    try {
        const allCourses = await CourseModel.findAll();
        if (!allCourses) {
            throw new Error('No courses found');
        }
        return allCourses;
    } catch (error) {
        console.error('Error occurred while retrieving all courses:', error);
        throw error;
    }
};

const addHoursTaken = async (courseName, hours) => {
    try {
        const course = await CourseModel.findOne({ where: { courseName } });
        if (!course) {
            throw new Error('Course not found');
        }
        course.hoursTaken += Number(hours);
        course.lastHoursAdded = Number(hours);
        course.courseLastUpdated = new Date();
        await course.save();
        return course;
    } catch (error) {
        console.error('Error occurred while adding hours taken:', error);
        throw error;
    }
};

module.exports = { getAllCourses, addHoursTaken };