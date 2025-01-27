const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const Course = require('../model/courses');
const WeeklySchedule = require('../model/weeklySchedule');
const Account = require('../model/account');
const applyAssociations = require('../model/associations');

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: true
});


// Initialize models
const models = {
    Course: Course(sequelize),
    WeeklySchedule: WeeklySchedule(sequelize),
    Account: Account(sequelize)
};

async function createDB() {
  try {
    // Apply associations
    applyAssociations(sequelize);
    await sequelize.sync();
    console.log('Database and tables created successfully.');
  } catch (err) {
    console.error('Unable to create database and tables:', err);
  }
};

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = { connectDB, createDB, models, sequelize };
