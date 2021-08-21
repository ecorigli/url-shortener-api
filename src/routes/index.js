const express = require('express');
const router = express.Router();
const urlShortenerController = require('../controller/urlShortenerController');
const userController = require('../controller/userController');

router.post('/shorten', urlShortenerController.saveUrl);
router.get('/domain', urlShortenerController.findByDomain);
router.get('/:id', urlShortenerController.findById);
router.post('/auth/register', userController.register);
router.get('/auth/login', userController.login);
router.get('/auth/authenticatedUser', userController.authenticatedUser);


module.exports = router;
