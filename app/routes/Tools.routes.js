const express = require('express');
const logger = require('../log')(module);
const router = express.Router();

// Require controller modules.
let toolsController = require('../controllers/Tools.controller.js');

router.get('/tools/dnsbl/:data', toolsController.dnsbl);
router.get('/tools/abuse/:data', toolsController.abuse);
router.get('/tools/score/:data', toolsController.score);
router.get('/tools/smtp/:data', toolsController.smtp);
router.get('/tools/domain/:data', toolsController.domain);
router.get('/tools/validate/:data', toolsController.validate);
router.get('/tools/geo/:data', toolsController.geo);
router.get('/tools/sysinfo', toolsController.sysinfo);


module.exports = router;