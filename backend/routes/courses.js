const express = require('express');
const router = express.Router();
const { Course, validate } = require('../models/course');

router.get('/', async (req, res) => {
    const course = await Course.find();
    res.send(course);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = new Course({
        course_code: req.body.course_code,
        course_name: req.body.course_name,
        course_description: req.body.course_description
    });

    await course.save();

    res.send(course);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = await Course.findOneAndUpdate({ course_code: req.params.id },
        {
            course_code: req.body.course_code,
            course_name: req.body.course_name,
            course_description: req.body.course_description
        },
        { new: true });

    if (!course) return res.status(404).send('No match for the ID.');

    res.send(course);
});

router.delete('/:id', async (req, res) => {
    const course = await Course.findOneAndRemove({ course_code: req.params.id });
    if (!course) return res.status(404).send('No match for the ID.');

    res.status(200).send(course);
});

router.get('/:id', async (req, res) => {
    const course = await Course.findOne({ course_code: req.params.id });

    if (!course) return res.status(404).send('No match for the ID.');

    res.send(course);
});

module.exports = router;
