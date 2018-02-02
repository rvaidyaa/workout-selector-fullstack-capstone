//const User = require('./models/users');
//const foodLog = require('./models/food-log');
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


// ---------------USER ENDPOINTS-------------------------------------

//app.get('/', (req, res) => {
//    const cookie = req.cookies[USER_LOGGEDIN_COOKIE];
//    console.log("=++++++++>>>>>app get cookie = ", cookie);
//    if (cookie === "user-loggedin") {
//        res.sendFile(__dirname + '/public/index.html');
//
//    }
//});



// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res, next) => {
    // check if client sent cookie
    var cookie = req.cookies.USER_LOGGEDIN_COOKIE;
    //    console.log('inital cookies = ', req.cookies);
    if ((cookie == undefined) || (cookie.lenght == 0)) {
        // no: set a new cookie

        res.cookie('USER_LOGGEDIN_COOKIE', loggedInUser, {
            maxAge: 900000,
            httpOnly: true
        });
        //        console.log('cookie created successfully');

    } else {
        // yes, cookie was already present
        //        console.log('cookie exists', cookie);
    }
    //    console.log('cookie set = ', req.cookies);
    next(); // <-- important!
});

app.get('/get-specific-workout/:name', function (req, res) { //make the name more relevant (ingrediant)

    //    external api function call and response

    var searchReq = getFromNutritionix(req.params.name);

    //get the data from the first api call
    searchReq.on('end', function (item) {
        res.json(item);
    });

    //error handling
    searchReq.on('error', function (code) {
        res.sendStatus(code);
    });

});

//
//app.delete('/delete-nutrition-data/:username', function (req, res) { //make better name
//    console.log(req.params.username);
//    foodLog.deleteMany({
//        'username': req.params.username
//    });
//});
//
//app.delete('/delete-nutrition-data/:deleteMeal/:username', function (req, res) {
//    foodLog.remove({
//        'meal': req.params.deleteMeal
//    }, function (err, item) {
//        if (err) {
//            return res.status(500).json({
//                message: 'Internal Server Error'
//            });
//        }
//        res.status(201).json(item);
//    });
//});



app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
