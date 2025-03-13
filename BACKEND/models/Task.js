const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  proof: {
    text: String,
    image: String
  },
  pendingCompletion: {
    type: Boolean,
    default: false
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  public: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;