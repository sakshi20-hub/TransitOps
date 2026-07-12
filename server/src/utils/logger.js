export {}
/**
 * logger.js
 * Centralized logging utility for the TransitOps backend.
 *
 * Provides consistent, timestamped, leveled logging across the application.
 * Avoids pulling in a third-party logging library to keep dependencies minimal;
 * can be swapped for winston/pino later without changing call sites, since
 * every module imports `logger` from this single file.
 */

const LOG_LEVELS = Object.freeze({
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  DEBUG: "DEBUG",
});

/**
 * Returns an ISO-8601 timestamp string for log entries.
 * @returns {string}
 */
const getTimestamp = () => new Date().toISOString();

/**
 * Formats a single log line with timestamp, level, and message.
 * @param {string} level - One of LOG_LEVELS.
 * @param {string} message - Human-readable log message.
 * @returns {string}
 */
const formatMessage = (level, message) => {
  return `[${getTimestamp()}] [${level}] ${message}`;
};

/**
 * Serializes extra metadata (objects, errors) for structured logging.
 * Keeps output readable in the console while preserving error stacks.
 * @param {*} meta - Additional data to log alongside the message.
 * @returns {string}
 */
const formatMeta = (meta) => {
  if (meta === undefined || meta === null) {
    return "";
  }

  if (meta instanceof Error) {
    return `\n  Error: ${meta.message}\n  Stack: ${meta.stack}`;
  }

  if (typeof meta === "object") {
    try {
      return `\n  Meta: ${JSON.stringify(meta, null, 2)}`;
    } catch (serializationError) {
      return `\n  Meta: [Unserializable object]`;
    }
  }

  return `\n  Meta: ${String(meta)}`;
};

/**
 * Logs an informational message. Used for general application flow events
 * (e.g., server started, DB connected, request completed).
 * @param {string} message
 * @param {*} [meta]
 */
const info = (message, meta) => {
  console.log(formatMessage(LOG_LEVELS.INFO, message) + formatMeta(meta));
};

/**
 * Logs a warning message. Used for recoverable issues or business-rule
 * violations that don't crash the request (e.g., validation rejections).
 * @param {string} message
 * @param {*} [meta]
 */
const warn = (message, meta) => {
  console.warn(formatMessage(LOG_LEVELS.WARN, message) + formatMeta(meta));
};

/**
 * Logs an error message. Used for caught exceptions, failed DB operations,
 * and unexpected failures surfaced to the global error handler.
 * @param {string} message
 * @param {*} [meta]
 */
const error = (message, meta) => {
  console.error(formatMessage(LOG_LEVELS.ERROR, message) + formatMeta(meta));
};

/**
 * Logs a debug message. Only emitted when NODE_ENV !== "production",
 * to avoid noisy output in production logs.
 * @param {string} message
 * @param {*} [meta]
 */
const debug = (message, meta) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.debug(formatMessage(LOG_LEVELS.DEBUG, message) + formatMeta(meta));
};

const logger = {
  info,
  warn,
  error,
  debug,
};

export default logger;