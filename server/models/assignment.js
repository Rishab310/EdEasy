const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        fileLink: {
            type: String,
            required: true
        },
        classCode: {
            type: Number,
            required: true
        },
        creatorEmail: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Assignment', assignmentSchema);