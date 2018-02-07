//const User = require('./models/users');
const workouts = require('./models/workouts');
const exercises = require('./models/exercises');
const customexercises = require('./models/customexercises');
const customworkout = require('./models/customworkout');
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
const nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
const transporter = nodemailer.createTransport('smtps://biasbalancednews%40gmail.com:2blue1.red@smtp.gmail.com');
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
            //populate calendar with exercise

            //        customworkouts.create
            console.log(workoutsResults);
            console.log('workout results ^^^^');
            //            let exercises = res.body.exercises;
            //            console.log(exercises);
            //            console.log('exercises for particular workout ^^^^')

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

//get exercises for user routine
app.get('/get-specific-exercise/:exercise', function (req, res) {
    console.log(req.params.exercise);
    exercises
        .find({
            'exercise': req.params.exercise
        })
        .then(function (item) {
            console.log('exercise is:');
            console.log(item);
            res.json({
                item
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/get-custom-exercises/:days', function (req, res) {
    console.log(req.params.days);
    customexercises
        .find({
            'days': req.params.days
        })
        .then(function (item) {
            console.log('exercise is:');
            console.log(item);
            res.json({
                item
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
//post endpoint to add custom exercise
app.post('/customexercises', (req, res) => {
    let name = req.body.name;
    let sets = req.body.sets;
    let reps = req.body.reps;
    let days = req.body.days;
    console.log('diff goal and commitment are:');
    console.log(name, sets, reps, days);
    customexercises
        .create({
            'name': name,
            'sets': sets,
            'reps': reps,
            'days': days
        })
        .then(function (customexercises) {
            console.log(customexercises);
            console.log('custom exercise is  ^^^^');
            //            let exercises = res.body.exercises;
            //            console.log(exercises);
            res.json({
                customexercises

            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
//delete endpoint to delete custom exercise, then we want to get the custom exercise
app.delete('/delete-exercises', function (req, res) { //make better name
    customexercises.remove({}, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });
        res.status(201).json(items);
    });
});
// email api endpoint
app.post("/send-email/", function (req, res) {
    console.log(req.body.emailBody);
    var mailOptions = {
        from: '"Bias Balanced News" <biasbalancednews@gmail.com>', // sender address
        to: req.body.emailAddress, // list of receivers
        subject: 'My reading list', // Subject line
        text: req.body.emailBody, // plaintext body
        html: req.body.emailHtml // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.status(201).json(info);
    });
});




//app.delete('/delete-exercises', function (req, res) { //make better name
//    customexercises.remove({}); {
//        return res.status(204).end();
//    }).catch(function (err) {
//    return res.status(500).json({
//        message: 'Internal Server Error'
//    });
//});

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
