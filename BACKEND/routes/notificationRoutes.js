const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, notificationController.getNotifications);
router.put('/:id/mark-as-read', authMiddleware, notificationController.markAsRead);

module.exports = router;