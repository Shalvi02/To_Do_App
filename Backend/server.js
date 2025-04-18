const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());  // For parsing JSON request bodies

// middlewares
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Backend server is working!');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
