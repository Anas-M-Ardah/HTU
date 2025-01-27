// models/associations.js
const applyAssociations = (sequelize) => {
    const { Course, WeeklySchedule } = sequelize.models;

    // Define associations
    Course.hasMany(WeeklySchedule, {
        foreignKey: {
            name: 'courseName',
            allowNull: false
        },
        onDelete: 'CASCADE'
    });

    WeeklySchedule.belongsTo(Course, {
        foreignKey: {
            name: 'courseName',
            allowNull: false
        }
    });
};

module.exports = applyAssociations;