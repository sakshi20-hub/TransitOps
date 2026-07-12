import Joi from 'joi';
import { ROLE_VALUES } from '../../utils/constants.js';

/**
 * Validation schema for POST /api/auth/register
 * Consumed by validateRequest(registerSchema) in auth.routes.js.
 */
export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'any.required': 'Name is required',
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).max(128).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),

  role: Joi.string()
    .valid(...ROLE_VALUES)
    .required()
    .messages({
      'any.only': `Role must be one of: ${ROLE_VALUES.join(', ')}`,
      'any.required': 'Role is required',
    }),
});

/**
 * Validation schema for POST /api/auth/login
 * Consumed by validateRequest(loginSchema) in auth.routes.js.
 */
export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

export default {
  registerSchema,
  loginSchema,
};