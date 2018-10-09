const workouts = require("./models/workouts");
const exercises = require("./models/exercises");
const customexercises = require("./models/customexercises");
const bodyParser = require("body-parser");
const config = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

const runServer = urlToUse => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      urlToUse,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(config.PORT, () => {
            console.log(`Listening on localhost:${config.PORT}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
};

if (require.main === module) {
  runServer(config.DATABASE_URL).catch(err => console.error(err));
}

const closeServer = () => {
  return mongoose.disconnect().then(
    () =>
      new Promise((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      })
  );
};

// ---------------USER ENDPOINTS-------------------------------------
//GETS specific routine based on user selections
app.post("/get-specific-routine", (req, res) => {
  const getWorkouts = async () => {
    return await workouts.find({
      difficulty: req.body.difficulty,
      goal: req.body.goal,
      commitment: req.body.commitment
    });
  };
  const run = async () => {
    const workoutsResults = await getWorkouts();
    if (!workoutsResults)
      return res.status(500).json({
        message: "internal server error"
      });
    res.status(200).json({
      workoutsResults
    });
  };
  run();
});
//get exercises pertaining to the specific routine returned above
app.get("/get-specific-exercise/:exercise", function(req, res) {
  const getSpecficExercises = async () => {
    return await exercises.find({
      exercise: req.params.exercise
    });
  };
  const run = async () => {
    const item = await getSpecficExercises();
    if (!item)
      return res.status(500).json({
        message: "Internal server error"
      });

    res.status(200).json({
      item
    });
  };
  run();
});

app.post("/customexercises", (req, res) => {
  const addCustomExercise = async () => {
    return await customexercises.create({
      name: req.body.name,
      sets: req.body.sets,
      reps: req.body.reps,
      days: req.body.days
    });
  };
  const run = async () => {
    let customexercises = await addCustomExercise();
    console.log(customexercises);
    if (!customexercises)
      return res.status(500).json({
        message: "internal server error"
      });
    res.status(200).json({
      customexercises
    });
  };
  run();
});
//get request to get the custom exercises that was just added to display
app.get("/get-custom-exercises/:days", function(req, res) {
  //   console.log(req.params.days);
  const getCustomExercises = async () => {
    return await customexercises.find({
      days: req.params.days
    });
  };
  const run = async () => {
    const item = await getCustomExercises();
    if (!item)
      return res.status(500).json({
        message: "internal server error"
      });
    res.status(200).json({
      item
    });
  };
  run();
});

//delete endpoint to delete custom exercise, then we want to get the custom exercise
app.delete("/delete-custom-exercise/:deleteId", function(req, res) {
  const deleteCustomExercises = async () => {
    return await customexercises.findByIdAndRemove(req.params.deleteId).exec();
  };
  const run = async () => {
    let deletedExercise = await deleteCustomExercises();
    console.log(deletedExercise);
    if (!deletedExercise)
      return res.status(500).json({ message: "internal server error" });
    res.status(204).end();
  };
  run();
});

app.delete("/delete-exercises", function(req, res) {
  const deleteAllCustomExercises = async () => {
    return await customexercises.remove({}, function(err, items) {
      if (err)
        return res.status(404).json({
          message: "Item not found."
        });
      res.status(201).json(items);
    });
  };
  deleteAllCustomExercises();
});
//catch all endpoint error
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found"
  });
});

//exports for heroku
exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
