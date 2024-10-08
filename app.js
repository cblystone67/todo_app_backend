// Import required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todos = require("./models/Todos"); // Importing the Todos model
require("dotenv").config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

const corsOptions = {
  origin: "https://captblytodos.netlify.app", // Replace with your Netlify app URL
  optionsSuccessStatus: 200,
};
// Connect to MongoDB using Mongoose
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@todos.levn0.mongodb.net/`
);

// Enable CORS for cross-origin requests
// CORS is required when a client (e.g., frontend) and server are on different origins/domains.
// It allows the server to accept requests from a different origin, such as a frontend hosted separately.
app.use(cors(corsOptions));

// Parse incoming JSON request bodies
app.use(express.json());

// Define a GET route to fetch all todos
app.get("/todos", async (req, res) => {
  const todos = await Todos.find(); // Fetch all documents from the 'Todos' collection
  res.json({ todos: todos }); // Send the todos as a JSON response
});

// Define a POST route to add a new todo
app.post("/add-item", async (req, res) => {
  const newTodo = await Todos.create(req.body); // Create a new todo based on request body
  res.json(newTodo); // Return the created todo as a response
});

// Define a POST route to update an existing todo by ID
app.post("/edit-item/:id", async (req, res) => {
  try {
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { text: req.body.text, completed: req.body.completed } }, // Update both task and completed status
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Define a DELETE route to remove a todo by ID
app.delete("/delete-item/:id", async (req, res) => {
  await Todos.deleteOne({ _id: req.params.id }); // Delete the todo by its ID
  res.json({ message: "Todo deleted successfully" }); // Confirm deletion with a response
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000"); // Log that the server is up and running
});
