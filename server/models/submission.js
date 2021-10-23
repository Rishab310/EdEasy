const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
        studentName: {
            type: String,
            required: true
        },
        studentEmail: {
            type: String,
            required: true
        },
        fileLink: {
            type: String,
            required: true
        },
        assignmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Assignment',
            required: true
        },
        classCode: {
            type: Number,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        grade: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Submission', submissionSchema);