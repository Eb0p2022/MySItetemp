const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    number: {
        type: Number,
        required: true
    },
    downloadLink: {
        
    }
})