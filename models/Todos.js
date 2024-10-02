// Import Mongoose and create a schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Todo schema
const todoSchema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Export the model for use in the app
module.exports = mongoose.model("Todos", todoSchema);
