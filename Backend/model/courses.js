// models/courses.js
const { DataTypes } = require('sequelize');


const Course = (sequelize) => {
    const Course = sequelize.define('courses', {
        courseName: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        hoursTaken: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        hoursRemaining: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            },
            get() {
                return this.totalHours - this.hoursTaken;
            }
        },
        totalHours: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        progressBar: {
            type: DataTypes.VIRTUAL,
            get() {
                return Math.round((this.hoursTaken / this.totalHours) * 100);
            }
        },
        lastHoursAdded: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        courseLastUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: true
            }
        }
    }, {
        timestamps: true,
        hooks: {
            beforeValidate: (course) => {
                // Automatically calculate hoursRemaining
                course.hoursRemaining = course.totalHours - course.hoursTaken;
            },
        }
    });

    return Course;
};

module.exports = Course;