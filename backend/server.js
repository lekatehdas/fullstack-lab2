const Joi = require("joi");
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

const students = require('../backend/routes/students')
const courses = require('../backend/routes/courses')
const registrations = require('../backend/routes/registrations')

require('dotenv').config()

mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('Could not connect to database', err));

app.use(express.json());
app.use(express.static('./dist/'));
app.use('/api/students', students);
app.use('/api/courses', courses);
app.use('/api/registrations', registrations);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}...`));
