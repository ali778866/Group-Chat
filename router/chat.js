const express = require('express');

const router = express.Router();

const authenticate = require('../middleware/auth')

const chatController = require('../controller/chat');

router.post('/add-chat', chatController.postChat);

router.get('/get-group-chat/:id', authenticate.authenticate, chatController.groupChat);

module.exports = router;