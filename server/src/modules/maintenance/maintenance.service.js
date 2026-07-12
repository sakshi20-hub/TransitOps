import MaintenanceLog from "../../models/MaintenanceLog.js";
import * as vehicleService from "../vehicle/vehicle.service.js";

export const createMaintenanceLog = async (data) => {
  const log = await MaintenanceLog.create({ ...data, status: "Active" });
  await vehicleService.updateVehicleStatus(data.vehicle, "In Shop");
  return log;
};

export const getAllMaintenanceLogs = async (filters = {}) => {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.vehicle) query.vehicle = filters.vehicle;

  return MaintenanceLog.find(query).populate("vehicle").sort({ createdAt: -1 });
};

export const getMaintenanceLogById = async (id) => {
  const log = await MaintenanceLog.findById(id).populate("vehicle");
  if (!log) throw new Error("Maintenance log not found");
  return log;
};

export const closeMaintenanceLog = async (id) => {
  const log = await MaintenanceLog.findById(id);
  if (!log) throw new Error("Maintenance log not found");
  if (log.status !== "Active") throw new Error("Only active maintenance logs can be closed");

  log.status = "Closed";
  await log.save();

  const vehicle = await vehicleService.getVehicleById(log.vehicle);
  if (vehicle.status !== "Retired") {
    await vehicleService.updateVehicleStatus(log.vehicle, "Available");
  }

  return log;
};