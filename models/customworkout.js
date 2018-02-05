"use strict";

const mongoose = require('mongoose');

const customworkoutSchema = new mongoose.Schema({

    exercises: {
        type: String,
        required: false
    }

});



const customworkout = mongoose.model('customworkout', customworkoutSchema);

module.exports = customworkout;
