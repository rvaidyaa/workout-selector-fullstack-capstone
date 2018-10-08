const workouts = require('./models/workouts');
const exercises = require('./models/exercises');
const customexercises = require('./models/customexercises');
const customworkout = require('./models/customworkout');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));



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
app.get("/get-specific-exercise/:exercise", function(req, res) {
    console.log(req.params.exercise);
    async function getSpecfic() {
      return await exercises.find({
        exercise: req.params.exercise
      });
    }
    async function run() {
      const item = await getSpecfic();
      if (!item) {
        res.status(500).json({
          message: "Internal server error"
        });
      } else {
        res.json({
          item
        });
      }
    }
    run();
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



app.delete('/delete-custom-exercise/:deleteId', function (req, res) { //make better name
    customexercises.findByIdAndRemove(req.params.deleteId).exec().then(function (foodLog) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});


app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
