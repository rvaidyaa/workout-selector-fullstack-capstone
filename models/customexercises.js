"use strict";

const mongoose = require('mongoose');

const customexercisesSchema = new mongoose.Schema({

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
    }

});



const customexercises = mongoose.model('customexercises', customexercisesSchema);

module.exports = customexercises;
