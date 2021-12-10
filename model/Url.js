const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlID: {
        type: String,
        required: true,
    },
    originalURL: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model('Url', UrlSchema);