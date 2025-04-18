const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create a new To-Do
// router.post('/', async (req, res) => {
//   const { title, description } = req.body;
//   const newTodo = new Todo({ title, description });
//   await newTodo.save();
//   res.json(newTodo);
// });

// router.post('/', async (req, res) => {
//     try {
//       const { title, description, date} = req.body;
//       const todo = new Todo({ title, description, date });
//       await todo.save();
//       res.status(201).json(todo);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

app.post('/api/todos', async (req, res) => {
  try {
    // Destructure the data from the request body
    const { title, description, dueDate } = req.body;

    // If title is missing, return an error response
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Create a new Todo
    const newTodo = new Todo({
      title,
      description,
      dueDate
    });

    // Save the new Todo to the database
    await newTodo.save();

    // Respond with the created Todo
    res.status(201).json(newTodo);
  } catch (error) {
    // Catch any errors and send a response
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});





// Get all To-Dos (with pagination)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const todos = await Todo.find()
    .skip((page - 1) * limit)
    .limit(limit);
  res.json(todos);
});

// Update a To-Do
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
  res.json(updatedTodo);
});

// Delete 
// DELETE todo by ID
router.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});


module.exports = router;
