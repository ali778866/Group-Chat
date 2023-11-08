const express = require('express');

const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });  

const authenticate = require('../middleware/auth')

const chatController = require('../controller/chat');

router.post('/add-chat', chatController.postChat);

router.post('/add-file', upload.single('file'), chatController.uploadFile)

router.get('/get-group-chat/:id', authenticate.authenticate, chatController.groupChat);

module.exports = router;