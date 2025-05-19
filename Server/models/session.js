const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new Schema({
    userId: {
        type: Number,
        immutable: true,
    },
    history: {
        type: [Object], // Each object contains { role: "user"/"model", parts: [{ text }] }
        default: [],
    }
});

module.exports = mongoose.model('Session', Session);
