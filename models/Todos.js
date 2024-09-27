// Import Mongoose and create a schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Todo schema
const todoSchema = new Schema({
  id: Number,
  text: String,
  completed: Boolean,
});

// Export the model for use in the app
module.exports = mongoose.model("Todos", todoSchema);
