const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date }, 
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
