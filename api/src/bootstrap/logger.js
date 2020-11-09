import { createLogger, transports, format } from 'winston';
import expressWinston from 'express-winston';
import { APP_LOGS, NODE_ENV } from './../configs/app';

const { combine, printf, json, timestamp } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const consoleFormat = printf(({ level, message, label, timestamp }) => {
  return message;
});

let loggerTransports = [
  new transports.File({ filename: `${APP_LOGS}/error.log`, level: 'error' }),
  new transports.File({
    filename: `${APP_LOGS}/combined.log`,
  }),
];

if (NODE_ENV !== 'test')
  loggerTransports.push(
    new transports.Console({
      format: consoleFormat,
    })
  );

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  exceptionHandlers: [
    new transports.File({ filename: `${APP_LOGS}/exceptions.log` }),
  ],
  transports: loggerTransports,
});

const loggerMiddleware = expressWinston.logger({
  transports: loggerTransports,
  format: format.combine(format.colorize(), consoleFormat),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) {
    return false;
  }, // optional: allows to skip some log messages based on request and/or response
});

module.exports = { logger, loggerMiddleware };
