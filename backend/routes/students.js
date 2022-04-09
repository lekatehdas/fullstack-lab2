const express = require('express');
const router = express.Router();
const { Student, validate } = require('../models/student');

router.get('/', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const student = new Student({
            student_id: req.body.student_id,
            name: req.body.name,
            email: req.body.email
        });

        await student.save();

        res.send(student);
    }
    catch (ex) {
        res.send('Student ID already in use');
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = await Student.findOneAndUpdate({ student_id: req.params.id },
        {
            student_id: req.body.student_id,
            name: req.body.name,
            email: req.body.email
        },
        { new: true });

    if (!student) return res.status(404).send('No match for the ID.');

    res.send(student);
});

router.delete('/:id', async (req, res) => {
    const student = await Student.findOneAndRemove({ student_id: req.params.id });

    if (!student) return res.status(404).send('No match for the ID.');

    res.status(200).send(student);
});

router.get('/:id', async (req, res) => {
    const student = await Student.findOne({ student_id: req.params.id });

    if (!student) return res.status(404).send('No match for the ID.');

    res.send(student);
});

module.exports = router;
