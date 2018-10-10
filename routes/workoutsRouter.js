const workouts = require("../models/workouts");
const exercises = require("../models/exercises");
const customexercises = require("../models/customexercises");
const express = require("express");
const router = express.Router();

router.post("/get-specific-routine", async (req, res) => {
    const workoutsResults = await workouts.find({
      difficulty: req.body.difficulty,
      goal: req.body.goal,
      commitment: req.body.commitment
    });
    if (!workoutsResults)
      return res.status(500).json({
        message: "internal server error"
      });
    res.status(200).json({
      workoutsResults
    });
  });
//get exercises pertaining to the specific routine returned above
router.get("/get-specific-exercise/:exercise", async (req, res) => {
    const item = await exercises.find({
      exercise: req.params.exercise
    });
    if (!item)
      return res.status(500).json({
        message: "Internal server error"
      });
    res.status(200).json({
      item
    });
  });
//All pertaining to custom exercises a user adds

router.post("/customexercises", async (req, res) => {
    let customExercises = await customexercises.create({
      name: req.body.name,
      sets: req.body.sets,
      reps: req.body.reps,
      days: req.body.days
    });
    console.log(customExercises);
    if (!customExercises)
      return res.status(500).json({
        message: "internal server error"
      });
    res.status(200).json({
      customExercises
    });
  });
//get request to get the custom exercises that was just added to display
router.get("/customexercises/:days", async (req, res) => {
    const item = await customexercises.find({
      days: req.params.days
    });
    if (!item)
      return res.status(500).json({
        message: "internal server error"
      });
    res.status(200).json({
      item
    });
  });
// delete all custom exercises on app start
router.delete("/customexercises", async (req, res) => {
    return await customexercises.remove({}, (err, items) => {
      if (err)
        return res.status(404).json({
          message: "Item not found."
        });
      res.status(201).json(items);
    });
  });
//delete endpoint to delete custom exercise, then we want to get the custom exercise
router.delete("/delete-custom-exercise/:deleteId", async (req, res) => {
    let deletedExercise = await customexercises
      .findByIdAndRemove(req.params.deleteId)
      .exec();
    if (!deletedExercise)
      return res.status(500).json({ message: "internal server error" });
    res.status(204).end();
  });
  


module.exports = router;
