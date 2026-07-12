
import dotenv from 'dotenv';

dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(
        `TransitOps API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};


const shutdown = (signal, exitCode = 0) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (server) {
    server.close(() => {
      console.log('Server closed.');
      process.exit(exitCode);
    });

    // Force exit if shutdown hangs
    setTimeout(() => {
      console.error('Forcing shutdown after timeout.');
      process.exit(1);
    }, 10000).unref();
  } else {
    process.exit(exitCode);
  }
};

// -------------------- Process-level Safety Nets --------------------

process.on('SIGINT', () => shutdown('SIGINT', 0));
process.on('SIGTERM', () => shutdown('SIGTERM', 0));

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err instanceof Error ? err.message : err}`);
  if (err instanceof Error && err.stack) {
    console.error(err.stack);
  }
  shutdown('unhandledRejection', 1);
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  if (err.stack) {
    console.error(err.stack);
  }
  shutdown('uncaughtException', 1);
});

startServer();