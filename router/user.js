const express = require('express');

const userController = require('../controller/user')

const router = express.Router();

router.post('/signup', userController.signupUser)

router.post('/login', userController.loginUser);

router.get('/show-participants/:id', userController.showParticipants)

router.get('/get-participants/:id', userController.getParticipants)

router.get('/get-user-data/:id', userController.getUserData);

module.exports = router;