const express = require('express');
const { connectDB, createDB } = require('./config/db');
const app = express();
const cors = require('cors');

app.use(cors());

const courseRouter = require('./route/courseRoute');
const weeklyScheduleRouter = require('./route/weeklyScheduleRoute');
const accountRouter = require('./route/accountRoute');

app.use(express.json());
app.use('/api', courseRouter);
app.use('/api', weeklyScheduleRouter);
app.use('/api', accountRouter);

const port = 3000;

app.listen(port, async () => {
    // await createDB();
    await connectDB();
    console.log(`App is listening on port ${port}`)
});