const express = require('express');
const logger = require('../log')(module);
const router = express.Router();

router.get('/', function (req, res) {
	res.json({message: new Date()});
	logger.info('%s %d', req.method, res.statusCode);
});

module.exports = router;