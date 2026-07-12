import { Router } from 'express';

import analyticsController from './analytics.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { rbacMiddleware } from '../../middlewares/rbacMiddleware.js';
import { ROLES } from '../../utils/constants.js';

const router = Router();

// All analytics routes require authentication.
router.use(authMiddleware);

// GET /api/analytics/dashboard - open to any authenticated role
router.get('/dashboard', analyticsController.getDashboardKpis);

// GET /api/analytics/reports - Financial Analyst & Fleet Manager only
router.get(
  '/reports',
  rbacMiddleware(ROLES.FINANCIAL_ANALYST, ROLES.FLEET_MANAGER),
  analyticsController.getReports
);

// GET /api/analytics/reports/export - Financial Analyst & Fleet Manager only
router.get(
  '/reports/export',
  rbacMiddleware(ROLES.FINANCIAL_ANALYST, ROLES.FLEET_MANAGER),
  analyticsController.exportReportsCsv
);

export default router;