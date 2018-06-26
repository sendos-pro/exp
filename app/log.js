const winston = require('winston');

winston.emitErrs = true;

function logger(module) {

    let logWinston = new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: process.cwd() + '/logs/all.log',
                handleException: true,
                json: true,
                maxSize: 5242880, //5mb
                maxFiles: 2,
                colorize: false
            }),
            new winston.transports.Console({
                level: 'debug',
                label: getFilePath(module),
                handleException: true,
                json: false,
                colorize: true
            })
        ],
        exitOnError: false
    });

    return logWinston;
}

function getFilePath(module) {
    // Add filename in log statements
    return module.filename.split('/').slice(-2).join('/');
}

module.exports = logger;