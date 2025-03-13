const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { to, message } = req.body;
    const newMessage = new Message({
      from: req.userId,
      to,
      message
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { from: req.userId, to: userId },
        { from: userId, to: req.userId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};