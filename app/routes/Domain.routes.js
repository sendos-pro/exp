const express = require('express');
const router = express.Router();

// Require controller modules.
let domainController = require('../controllers/Domain.controller.js');

// Private API
router.post('/domain/create', domainController.create);
router.get('/domain/:id/update', domainController.update);
router.get('/domain/:id/delete', domainController.delete);
router.get('/domain/:id', domainController.findOne);
router.get('/domain', domainController.findAll);

module.exports = router;