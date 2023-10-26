const express = require('express');

const router = express.Router();

const authenticate = require('../middleware/auth')

const groupController = require('../controller/group');

router.post('/create-group', authenticate.authenticate, groupController.createGroup);

router.get('/show-group', authenticate.authenticate, groupController.showGroup);

router.get('/get-group/:id', authenticate.authenticate, groupController.getGroup);

router.post('/add-participants/:id', groupController.addParticipants)

module.exports = router;