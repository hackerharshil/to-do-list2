const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


// Connect to MongoDB
mongoose.connect('mongodb+srv://harshil:neelamne1@cluster0.tkrujzc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check the database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the task schema
const taskSchema = new mongoose.Schema({
  task: String,
  month: String,
  type: String,
  completed: Boolean,
});

// Create the task model
const Task = mongoose.model('Task', taskSchema);

// Create an Express server
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Define your API routes and other server logic here

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Enable JSON parsing for request bodies
app.use(express.json());

// Set up routes
app.post('/api/tasks', (req, res) => {
  const { task, month, type } = req.body;

  // Create a new task document
  const newTask = new Task({
    task,
    month,
    type,
    completed: false,
  });

  // Save the task to the database
  newTask.save((err, task) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create task' });
    }

    res.status(201).json(task);
  });
});



app.get('/api/tasks', (req, res) => {
  Task.find((err, tasks) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve tasks' });
    }

    res.json(tasks);
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndUpdate(
    taskId,
    { completed: req.body.completed },
    { new: true },
    (err, task) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update task' });
      }

      res.json(task);
    }
  );
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndRemove(taskId, (err, task) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete task' });
    }

    res.json(task);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
