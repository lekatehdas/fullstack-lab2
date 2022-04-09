const mongoose = require('mongoose');
const Joi = require('joi');
const {date} = require("joi");

const registrationSchema = new mongoose.Schema({
    student: {
        type: new mongoose.Schema({
            student_id: {
                type: String,
                minlength: 3,
                maxlength: 50,
                required: true
            },
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            email: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            course_code: {
                type: String,
                required: true,
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
        }),
        required: true
    },
    unix_timestamp: {
        type: Date,
        default: Date.now()
    }
});

const Registration = mongoose.model('Registration', registrationSchema);

function validateRegistration(course) {
    const schema = Joi.object({
        student_id: Joi.string().min(3).max(50).required(),
        course_code: Joi.string().min(3).max(50).required()
    });
    return schema.validate(course);
}

exports.Registration = Registration;
exports.validate = validateRegistration;
