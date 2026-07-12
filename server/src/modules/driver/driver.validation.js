import Joi from 'joi';
import { DRIVER_STATUS_VALUES } from '../../utils/constants.js';


export const createDriverSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Driver name is required',
    'any.required': 'Driver name is required',
  }),

  licenseNumber: Joi.string().trim().min(3).max(30).required().messages({
    'string.empty': 'License number is required',
    'any.required': 'License number is required',
  }),

  licenseCategory: Joi.string().trim().required().messages({
    'string.empty': 'License category is required',
    'any.required': 'License category is required',
  }),

  licenseExpiryDate: Joi.date().required().messages({
    'date.base': 'License expiry date must be a valid date',
    'any.required': 'License expiry date is required',
  }),

  contactNumber: Joi.string().trim().min(7).max(20).required().messages({
    'string.empty': 'Contact number is required',
    'any.required': 'Contact number is required',
  }),

  safetyScore: Joi.number().min(0).max(100).default(100).messages({
    'number.min': 'Safety score cannot be negative',
    'number.max': 'Safety score cannot exceed 100',
  }),

  status: Joi.string()
    .valid(...DRIVER_STATUS_VALUES)
    .messages({
      'any.only': `Status must be one of: ${DRIVER_STATUS_VALUES.join(', ')}`,
    }),
});


export const updateDriverSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  licenseNumber: Joi.string().trim().min(3).max(30),
  licenseCategory: Joi.string().trim(),
  licenseExpiryDate: Joi.date(),
  contactNumber: Joi.string().trim().min(7).max(20),
  safetyScore: Joi.number().min(0).max(100),
  status: Joi.string().valid(...DRIVER_STATUS_VALUES),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided to update',
  });


export const driverIdParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid driver id format',
      'any.required': 'Driver id is required',
    }),
});

export default {
  createDriverSchema,
  updateDriverSchema,
  driverIdParamSchema,
};