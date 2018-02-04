//const User = require('./models/users');
const workouts = require('./models/workouts');
const exercises = require('./models/exercises');
//const online = require('./models/online');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');


const unirest = require('unirest');
const events = require('events');

const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));;

mongoose.Promise = global.Promise;


// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}
//
app.post('/get-specific-routine', (req, res) => {
    let difficulty = req.body.difficulty;
    let goal = req.body.goal;
    let commitment = req.body.commitment;
    console.log('diff goal and commitment are:');
    console.log(difficulty, goal, commitment);
    workouts
        .find({
            'difficulty': difficulty,
            'goal': goal,
            'commitment': commitment
        })
        .then(function (workoutsResults) {
            //here we want to grab the exercises from workoutresults
            //for each exercises we want a exercises.find({'exercise':'})
            console.log(workoutsResults);
            console.log('workout results ^^^^');
            //            let exercises = res.body.exercises;
            //            console.log(exercises);
            console.log('exercises for particular workout ^^^^')
            res.json({
                workoutsResults

            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.post('/get-specific-routine', (req, res) => {
    let difficulty = req.body.difficulty;
    let goal = req.body.goal;
    let commitment = req.body.commitment;
    console.log('diff goal and commitment are:');
    console.log(difficulty, goal, commitment);
    workouts
        .find({
            'difficulty': difficulty,
            'goal': goal,
            'commitment': commitment
        })
        .then(function (workoutsResults) {
            //here we want to grab the exercises from workoutresults
            //for each exercises we want a exercises.find({'exercise':'})
            console.log(workoutsResults);
            console.log('workout results ^^^^');
            //            let exercises = res.body.exercises;
            //            console.log(exercises);
            console.log('exercises for particular workout ^^^^')
            res.json({
                workoutsResults

            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
// ---------------USER ENDPOINTS-------------------------------------

//app.get('/', (req, res) => {
//    const cookie = req.cookies[USER_LOGGEDIN_COOKIE];
//    console.log("=++++++++>>>>>app get cookie = ", cookie);
//    if (cookie === "user-loggedin") {
//        res.sendFile(__dirname + '/public/index.html');
//
//    }



app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
