const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

router.post('/message', authMiddleware, chatController.sendMessage);
router.get('/messages/:userId', authMiddleware, chatController.getMessages);

module.exports = router;