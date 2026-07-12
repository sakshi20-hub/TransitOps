import Driver from '../../models/Driver.js';
import { HTTP_STATUS, DRIVER_STATUS } from '../../utils/constants.js';
import { getAvailableDrivers as fetchAvailableDrivers } from '../../shared/statusService.js';


export const createDriver = async (payload) => {
  const existing = await Driver.findOne({ licenseNumber: payload.licenseNumber });

  if (existing) {
    const error = new Error('A driver with this license number already exists');
    error.statusCode = HTTP_STATUS.CONFLICT;
    throw error;
  }

  return Driver.create(payload);
};


export const getAllDrivers = async (filter = {}) => {
  const query = {};

  if (filter.status) {
    query.status = filter.status;
  }

  if (filter.licenseCategory) {
    query.licenseCategory = filter.licenseCategory;
  }

  return Driver.find(query).sort({ createdAt: -1 });
};


export const getDriverById = async (id) => {
  const driver = await Driver.findById(id);

  if (!driver) {
    const error = new Error('Driver not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return driver;
};

export const updateDriver = async (id, updates) => {
  if (updates.licenseNumber) {
    const existing = await Driver.findOne({
      licenseNumber: updates.licenseNumber,
      _id: { $ne: id },
    });

    if (existing) {
      const error = new Error('A driver with this license number already exists');
      error.statusCode = HTTP_STATUS.CONFLICT;
      throw error;
    }
  }

  const driver = await Driver.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!driver) {
    const error = new Error('Driver not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return driver;
};


export const deleteDriver = async (id) => {
  const driver = await Driver.findByIdAndDelete(id);

  if (!driver) {
    const error = new Error('Driver not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return driver;
};


export const getDispatchEligibleDrivers = async () => {
  const availableDrivers = await fetchAvailableDrivers();
  const now = new Date();

  return availableDrivers.filter(
    (driver) => driver.status !== DRIVER_STATUS.SUSPENDED && driver.licenseExpiryDate >= now
  );
};

export default {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getDispatchEligibleDrivers,
};
