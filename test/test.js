const chai = require("chai");
const chaiHttp = require("chai-http");
const config = require("../config");
const request = require("supertest");

const { app, runServer, closeServer } = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Exercises", () => {
  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(() => {
    return runServer(config.DATABASE_URL);
  });

  // Close server after these tests run in case
  // we have other test modules that need to
  // call `runServer`. If server is already running,
  // `runServer` will error out.
  after(() => {
    return closeServer();
  });

  it("Should return routine on Post to get specific routine", async () => {
    const res = await chai
      .request(app)
      .post("/get-specific-routine")
      .send({
        difficulty: "beginner",
        goal: "hypertrophy",
        commitment: "fourx"
      });
    console.log("test console", res.body.workoutsResults);
    expect(res, "status 200").to.have.status(200);
    expect(res, "must be json").to.be.json;
    expect(res.body, "must be an object").to.be.a("object");
    expect(res.body.workoutsResults).to.be.a("array");
    res.body.workoutsResults.forEach(item => {
      expect(item).to.have.all.keys(
        "_id",
        "name",
        "link",
        "exercises",
        "difficulty",
        "goal",
        "commitment"
      );
    });
  });
  it("Should return exercise on Get", async () => {
    const res = await chai
      .request(app)
      .get("/get-specific-exercise/strongliftsquats");
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.a("object");
    console.log(res.body.item[0]);
    expect(res.body.item[0]).to.be.a("object");
    res.body.item.forEach(item => {
      expect(item).to.have.all.keys(
        "_id",
        "exercise",
        "name",
        "sets",
        "reps",
        "days",
        "link"
      );
    });
  });
});
