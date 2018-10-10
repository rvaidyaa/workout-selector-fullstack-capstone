const bodyParser = require("body-parser");
const workoutRouter = require("./routes/workoutsRouter")
const config = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use('/',workoutRouter);
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
//catch all endpoint
app.use("*", async (req, res) => {
    res.status(404).json({
      message: "Not Found"
    });
  });
//exports for heroku
exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
