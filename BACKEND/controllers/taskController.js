const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, public, deadline } = req.body;
    const newTask = new Task({
      title,
      description,
      public,
      deadline,
      creator: req.userId
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ $or: [{ creator: req.userId }, { participants: req.userId }, { public: true }] });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { proofText, proofImage } = req.body;
    const task = await Task.findById(id);
    if (task.creator.toString() === req.userId) {
      task.completed = true;
      task.pendingCompletion = false;
    } else {
      task.proof = { text: proofText, image: proofImage };
      task.pendingCompletion = true;
    }
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};