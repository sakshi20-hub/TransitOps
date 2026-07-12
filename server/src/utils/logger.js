<<<<<<< HEAD
export {}
=======

const getTimestamp = () => new Date().toISOString();

const info = (message, meta = "") => {
  console.log(`[${getTimestamp()}] [INFO] ${message}`, meta);
};

const warn = (message, meta = "") => {
  console.warn(`[${getTimestamp()}] [WARN] ${message}`, meta);
};

const error = (message, meta = "") => {
  console.error(`[${getTimestamp()}] [ERROR] ${message}`, meta);
};

const debug = (message, meta = "") => {
  if (process.env.NODE_ENV === "production") return;
  console.debug(`[${getTimestamp()}] [DEBUG] ${message}`, meta);
};

const logger = { info, warn, error, debug };

export default logger;
>>>>>>> origin/main
