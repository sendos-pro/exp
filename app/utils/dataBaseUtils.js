const mongoose = require('mongoose');
const logger = require('../log')(module);

// Функция соединения
module.exports.setUpConnection = function() {

	mongoose.Promise = global.Promise;

	//Options connect
	const options = {
		autoIndex: false,
		poolSize: 100,
	};

	// Connecting to the database
	mongoose.connect(process.env.MONGO_URL, options)
	.then(() => {
		logger.info('Connected to DB!');
	}).catch(err => {
		logger.error(err);
		process.exit();
	});

}




