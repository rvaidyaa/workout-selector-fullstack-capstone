"use strict";

const mongoose = require('mongoose');

const workoutsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    exercises: {
        type: String,
        required: false
    },

    difficulty: {
        type: String,
        required: false
    },
    goal: {
        type: String,
        required: false
    },
    commitment: {
        type: String,
        required: false
    }
});



const workouts = mongoose.model('workouts', workoutsSchema);

module.exports = workouts;
