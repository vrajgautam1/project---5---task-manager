const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  dateAssigned: Date,
  dateCompleted: Date,
  status: { type: String, enum: ["Incomplete", "Completed"] }, // Radio + disabled when completed
});

const taskModel = mongoose.model("taskModel", TaskSchema);

module.exports = taskModel;