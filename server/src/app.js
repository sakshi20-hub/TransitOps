
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { API_PREFIX, HTTP_STATUS } from './utils/constants.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();

// -------------------- Global Middlewares --------------------

// CORS - restrict to configured client origin (falls back to * in dev if unset)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// HTTP request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- Base / Health Routes --------------------

app.get('/', (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'TransitOps API is running',
  });
});

app.get(`${API_PREFIX}/health`, (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'OK',
    timestamp: new Date().toISOString(),
  });
});

// -------------------- Feature Module Routes --------------------
// Business modules are mounted here as they are implemented.
//
// app.use(`${API_PREFIX}/auth`, authRoutes);
// app.use(`${API_PREFIX}/vehicles`, vehicleRoutes);
// app.use(`${API_PREFIX}/drivers`, driverRoutes);
// app.use(`${API_PREFIX}/trips`, tripRoutes);
// app.use(`${API_PREFIX}/maintenance`, maintenanceRoutes);
// app.use(`${API_PREFIX}/fuel-expenses`, fuelExpenseRoutes);
// app.use(`${API_PREFIX}/analytics`, analyticsRoutes);

// -------------------- Error Handling --------------------
// Must be registered after all routes.
app.use(notFoundHandler);
app.use(errorHandler);

export default app;