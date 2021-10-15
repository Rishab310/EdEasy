const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
        creatorName: {
            type: String,
            required: true
        },
        creatorEmail: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        usePushEach: true
    }
)

module.exports = mongoose.model('Classroom', discussionSchema);