<<<<<<< HEAD
export {}
=======
import Vehicle from "../../models/Vehicle.js";

// Create a new vehicle
export const createVehicle = async (data) => {
  const existing = await Vehicle.findOne({
    registrationNumber: data.registrationNumber.toUpperCase(),
  });

  if (existing) {
    throw new Error("Vehicle with this registration number already exists");
  }

  const vehicle = await Vehicle.create(data);
  return vehicle;
};

// Get all vehicles, optional filters (status, type, region)
export const getAllVehicles = async (filters = {}) => {
  const query = {};

  if (filters.status) query.status = filters.status;
  if (filters.type) query.type = filters.type;
  if (filters.region) query.region = filters.region;

  const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
  return vehicles;
};

// Get a single vehicle by id
export const getVehicleById = async (id) => {
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  return vehicle;
};

// Update vehicle details
export const updateVehicle = async (id, data) => {
  if (data.registrationNumber) {
    const existing = await Vehicle.findOne({
      registrationNumber: data.registrationNumber.toUpperCase(),
      _id: { $ne: id },
    });
    if (existing) {
      throw new Error("Another vehicle already uses this registration number");
    }
  }

  const vehicle = await Vehicle.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return vehicle;
};

// Delete a vehicle
export const deleteVehicle = async (id) => {
  const vehicle = await Vehicle.findByIdAndDelete(id);
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  return vehicle;
};

// Get vehicles that are eligible for dispatch (Available only)
export const getDispatchEligibleVehicles = async () => {
  const vehicles = await Vehicle.find({ status: "Available" });
  return vehicles;
};

// Update vehicle status (used by trip/maintenance modules)
export const updateVehicleStatus = async (id, status) => {
  const vehicle = await Vehicle.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  return vehicle;
};
>>>>>>> origin/main
