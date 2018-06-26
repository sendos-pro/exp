const express = require('express');
const router = express.Router();

// Require controller modules.
let userController = require('../controllers/User.controller.js');

// Private API
router.post('/user/create', userController.create);
router.get('/user/:user/update', userController.update);
router.get('/user/:user/delete', userController.delete);
router.get('/user/:user', userController.findOne);
router.get('/users', userController.findAll);

module.exports = router;