const mongoose = require('mongoose');
const Joi = require('joi');

const studentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        unique: true
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
});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
    const schema = Joi.object({
        student_id: Joi.string().min(3).max(50).required(),
        name: Joi.string().min(3).max(50).required(),
       email: Joi.string().min(3).max(50).required().email()
    });
    return schema.validate(student);
}

exports.Student = Student;
exports.validate = validateStudent;
