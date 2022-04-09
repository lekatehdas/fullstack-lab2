const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
    course_code: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    course_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    course_description: {
        type: String,
        required: true,
        maxlength: 255
    }
});

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = Joi.object({
        course_code: Joi.string().min(3).max(50).required(),
        course_name: Joi.string().min(3).max(50).required(),
        course_description: Joi.string().max(255).required()
    });
    return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;
