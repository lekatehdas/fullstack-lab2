const express = require('express');
const router = express.Router();
const { Registration, validate } = require('../models/registration');
const { Student } = require('../models/student');
const { Course } = require('../models/course');


router.get('/', async (req, res) => {
    const registrations = await Registration.find();
    res.send(registrations);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const student = await Student.findOne({ student_id: req.body.student_id });
    if (!student) return res.status(400).send('Invalid student id');

    let course = await Course.findOne({ course_code: req.body.course_code });
    if (!course) return res.status(400).send('Invalid course code');


    let registration = new Registration({
        student: {
            student_id:student.student_id,
            name: student.name,
            email: student.email
        },
        course: {
            course_code: course.course_code,
            course_name: course.course_name,
            course_description: course.course_description
        }
    });

    registration = await registration.save();
    res.send(registration)
});

router.get('/latest', async (req, res) => {
    const registrations = await Registration
        .find()
        .sort({unix_timestamp: -1})
        .limit(5)
    res.send(registrations);
});

module.exports = router;
