const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        email: {
            type: String,
            required: true 
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        contact: {
            type: Number,
            required: true
        },
        classesEnrolled: [Number],
        classesOwned: [Number]
    },
    {
        timestamps: true,
        usePushEach: true
    }
)

module.exports = mongoose.model('User', userSchema);