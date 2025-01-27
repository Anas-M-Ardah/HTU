// models/weeklySchedule.js
const { DataTypes } = require('sequelize');

const WeeklySchedule = (sequelize) => {
    const WeeklySchedule = sequelize.define('WeeklySchedule', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dayName: {
            type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
            allowNull: false,
            validate: {
                isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
            }
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: true,
        validate: {
            timeOrder() {
                if (this.startTime >= this.endTime) {
                    throw new Error('End time must be after start time');
                }
            }
        },
        indexes: [
            {
                fields: ['dayName']
            }
        ]
    });

    return WeeklySchedule;
};

module.exports = WeeklySchedule;