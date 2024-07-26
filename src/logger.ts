import winston, { format } from "winston";
const { combine, timestamp, errors } = format;

const customFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: [${level.toUpperCase()}] ${stack || message}`;
});

export const logger = winston.createLogger({
  level: "debug",
  format: combine(timestamp(), errors({ stack: true }), customFormat),
  transports: [new winston.transports.Console()],
});
