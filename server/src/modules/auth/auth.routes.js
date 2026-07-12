import { Router } from 'express';

import authController from './auth.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { registerSchema, loginSchema } from './auth.validation.js';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRequest(registerSchema), authController.register);

// POST /api/auth/login
router.post('/login', validateRequest(loginSchema), authController.login);

// GET /api/auth/me
router.get('/me', authMiddleware, authController.getMe);

export default router;
