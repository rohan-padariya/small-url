const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
    counter: {
        type: Number,
        required: true,
        default: 1,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('Config', ConfigSchema);