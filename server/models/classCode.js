const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classCodeSchema = new Schema({
    code: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('classCode', classCodeSchema);