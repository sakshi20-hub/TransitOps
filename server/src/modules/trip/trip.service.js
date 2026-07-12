import Trip from "../../models/Trip.js";
import * as vehicleService from "../vehicle/vehicle.service.js";
import * as driverService from "../driver/driver.service.js";

export const createTrip = async (data) => {
  const vehicle = await vehicleService.getVehicleById(data.vehicle);
  const driver = await driverService.getDriverById(data.driver);

  if (vehicle.status !== "Available") {
    throw new Error("Vehicle is not available");
  }

  if (driver.status !== "Available") {
    throw new Error("Driver is not available");
  }

  if (new Date(driver.licenseExpiryDate) < new Date()) {
    throw new Error("Driver's license has expired");
  }

  if (data.cargoWeight > vehicle.maxLoadCapacity) {
    throw new Error("Cargo weight exceeds vehicle capacity");
  }

  const trip = await Trip.create({ ...data, status: "Draft" });
  return trip;
};

export const getAllTrips = async (filters = {}) => {
  const query = {};
  if (filters.status) query.status = filters.status;

  return Trip.find(query).populate("vehicle").populate("driver").sort({ createdAt: -1 });
};

export const getTripById = async (id) => {
  const trip = await Trip.findById(id).populate("vehicle").populate("driver");
  if (!trip) throw new Error("Trip not found");
  return trip;
};

export const dispatchTrip = async (id) => {
  const trip = await Trip.findById(id);
  if (!trip) throw new Error("Trip not found");
  if (trip.status !== "Draft") throw new Error("Only Draft trips can be dispatched");

  await vehicleService.updateVehicleStatus(trip.vehicle, "On Trip");
  await driverService.updateDriverStatus(trip.driver, "On Trip");

  trip.status = "Dispatched";
  await trip.save();
  return trip;
};

export const completeTrip = async (id, data) => {
  const trip = await Trip.findById(id);
  if (!trip) throw new Error("Trip not found");
  if (trip.status !== "Dispatched") throw new Error("Only Dispatched trips can be completed");

  trip.status = "Completed";
  trip.finalOdometer = data.finalOdometer ?? trip.finalOdometer;
  trip.fuelConsumed = data.fuelConsumed ?? trip.fuelConsumed;
  trip.actualDistance = data.actualDistance ?? trip.plannedDistance;
  await trip.save();

  await vehicleService.updateVehicleStatus(trip.vehicle, "Available");
  await driverService.updateDriverStatus(trip.driver, "Available");
  return trip;
};

export const cancelTrip = async (id) => {
  const trip = await Trip.findById(id);
  if (!trip) throw new Error("Trip not found");
  if (trip.status === "Completed" || trip.status === "Cancelled") {
    throw new Error("Trip already completed or cancelled");
  }

  if (trip.status === "Dispatched") {
    await vehicleService.updateVehicleStatus(trip.vehicle, "Available");
    await driverService.updateDriverStatus(trip.driver, "Available");
  }

  trip.status = "Cancelled";
  await trip.save();
  return trip;
};