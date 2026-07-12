import { Router } from 'express';

import driverController from './driver.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { rbacMiddleware } from '../../middlewares/rbacMiddleware.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import {
  createDriverSchema,
  updateDriverSchema,
  driverIdParamSchema,
} from './driver.validation.js';
import { ROLES } from '../../utils/constants.js';

const router = Router();

// All driver routes require authentication.
router.use(authMiddleware);

// GET /api/drivers/available - must be declared before /:id
router.get('/available', driverController.getAvailableDrivers);

// GET /api/drivers
router.get('/', driverController.getAllDrivers);

// GET /api/drivers/:id
router.get(
  '/:id',
  validateRequest(driverIdParamSchema, 'params'),
  driverController.getDriverById
);

// POST /api/drivers - Fleet Manager & Safety Officer only
router.post(
  '/',
  rbacMiddleware(ROLES.FLEET_MANAGER, ROLES.SAFETY_OFFICER),
  validateRequest(createDriverSchema),
  driverController.createDriver
);

// PUT /api/drivers/:id - Fleet Manager & Safety Officer only
router.put(
  '/:id',
  rbacMiddleware(ROLES.FLEET_MANAGER, ROLES.SAFETY_OFFICER),
  validateRequest(driverIdParamSchema, 'params'),
  validateRequest(updateDriverSchema),
  driverController.updateDriver
);

// DELETE /api/drivers/:id - Fleet Manager only
router.delete(
  '/:id',
  rbacMiddleware(ROLES.FLEET_MANAGER),
  validateRequest(driverIdParamSchema, 'params'),
  driverController.deleteDriver
);

export default router;
