const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middleware/auth');

router.post('/request', authMiddleware, friendController.sendFriendRequest);
router.put('/request/:id/accept', authMiddleware, friendController.acceptFriendRequest);
router.put('/request/:id/reject', authMiddleware, friendController.rejectFriendRequest);

module.exports = router;