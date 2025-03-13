const FriendRequest = require('../models/friendRequest');
const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { to } = req.body;
    const newRequest = new FriendRequest({
      from: req.userId,
      to
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await FriendRequest.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
    const fromUser = await User.findById(request.from);
    const toUser = await User.findById(request.to);
    fromUser.friends.push(toUser._id);
    toUser.friends.push(fromUser._id);
    await fromUser.save();
    await toUser.save();
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.rejectFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await FriendRequest.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};