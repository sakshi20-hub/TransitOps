import mongoose from 'mongoose';
import { DRIVER_STATUS, DRIVER_STATUS_VALUES } from '../utils/constants.js';

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Driver name is required'],
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: [true, 'License number is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    licenseCategory: {
      type: String,
      required: [true, 'License category is required'],
      trim: true,
    },
    licenseExpiryDate: {
      type: Date,
      required: [true, 'License expiry date is required'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    safetyScore: {
      type: Number,
      min: [0, 'Safety score cannot be negative'],
      max: [100, 'Safety score cannot exceed 100'],
      default: 100,
    },
    status: {
      type: String,
      enum: {
        values: DRIVER_STATUS_VALUES,
        message: `Status must be one of: ${DRIVER_STATUS_VALUES.join(', ')}`,
      },
      default: DRIVER_STATUS.AVAILABLE,
    },
  },
  {
    timestamps: true,
  }
);

// -------------------- Indexes --------------------

driverSchema.index({ licenseNumber: 1 }, { unique: true });
driverSchema.index({ status: 1 });

// -------------------- Virtuals --------------------

driverSchema.virtual('isLicenseExpired').get(function isLicenseExpired() {
  return this.licenseExpiryDate < new Date();
});

driverSchema.set('toJSON', { virtuals: true });
driverSchema.set('toObject', { virtuals: true });

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
