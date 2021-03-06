"use strict";

const mongoose = require('mongoose');

const exercisesSchema = new mongoose.Schema({
    exercise: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    sets: {
        type: String,
        required: false
    },

    reps: {
        type: String,
        required: false
    },
    days: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
});



const exercises = mongoose.model('exercises', exercisesSchema);

module.exports = exercises;
