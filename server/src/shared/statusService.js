<<<<<<< HEAD
export {}
=======
import Vehicle from '../models/Vehicle.js';
import Driver from '../models/Driver.js';
import { VEHICLE_STATUS, DRIVER_STATUS } from '../utils/constants.js';

// -------------------- Low-level setters --------------------

export const setVehicleStatus = async (vehicleId, status, session = null) => {
  if (!Object.values(VEHICLE_STATUS).includes(status)) {
    const error = new Error(`Invalid vehicle status: ${status}`);
    error.statusCode = 400;
    throw error;
  }

  const vehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    { status },
    { new: true, runValidators: true, session }
  );

  if (!vehicle) {
    const error = new Error(`Vehicle not found: ${vehicleId}`);
    error.statusCode = 404;
    throw error;
  }

  return vehicle;
};

/**
 * Sets a driver's status directly. Throws if the driver doesn't exist.
 */
export const setDriverStatus = async (driverId, status, session = null) => {
  if (!Object.values(DRIVER_STATUS).includes(status)) {
    const error = new Error(`Invalid driver status: ${status}`);
    error.statusCode = 400;
    throw error;
  }

  const driver = await Driver.findByIdAndUpdate(
    driverId,
    { status },
    { new: true, runValidators: true, session }
  );

  if (!driver) {
    const error = new Error(`Driver not found: ${driverId}`);
    error.statusCode = 404;
    throw error;
  }

  return driver;
};

// -------------------- Trip lifecycle transitions --------------------


export const dispatchTrip = async ({ vehicleId, driverId }, session = null) => {
  const vehicle = await setVehicleStatus(vehicleId, VEHICLE_STATUS.ON_TRIP, session);
  const driver = await setDriverStatus(driverId, DRIVER_STATUS.ON_TRIP, session);
  return { vehicle, driver };
};


export const completeTrip = async ({ vehicleId, driverId }, session = null) => {
  const vehicle = await setVehicleStatus(vehicleId, VEHICLE_STATUS.AVAILABLE, session);
  const driver = await setDriverStatus(driverId, DRIVER_STATUS.AVAILABLE, session);
  return { vehicle, driver };
};

export const cancelDispatchedTrip = async ({ vehicleId, driverId }, session = null) => {
  const vehicle = await setVehicleStatus(vehicleId, VEHICLE_STATUS.AVAILABLE, session);
  const driver = await setDriverStatus(driverId, DRIVER_STATUS.AVAILABLE, session);
  return { vehicle, driver };
};

// -------------------- Maintenance lifecycle transitions --------------------


export const openMaintenance = async (vehicleId, session = null) => {
  return setVehicleStatus(vehicleId, VEHICLE_STATUS.IN_SHOP, session);
};


export const closeMaintenance = async (vehicleId, session = null) => {
  const vehicle = await Vehicle.findById(vehicleId).session(session);

  if (!vehicle) {
    const error = new Error(`Vehicle not found: ${vehicleId}`);
    error.statusCode = 404;
    throw error;
  }

  if (vehicle.status === VEHICLE_STATUS.RETIRED) {
    return vehicle;
  }

  return setVehicleStatus(vehicleId, VEHICLE_STATUS.AVAILABLE, session);
};

// -------------------- Availability queries --------------------


export const getAvailableVehicles = async (filter = {}) => {
  return Vehicle.find({ ...filter, status: VEHICLE_STATUS.AVAILABLE });
};


export const getAvailableDrivers = async (filter = {}) => {
  return Driver.find({ ...filter, status: DRIVER_STATUS.AVAILABLE });
};

export default {
  setVehicleStatus,
  setDriverStatus,
  dispatchTrip,
  completeTrip,
  cancelDispatchedTrip,
  openMaintenance,
  closeMaintenance,
  getAvailableVehicles,
  getAvailableDrivers,
};
>>>>>>> origin/main
