import * as vehicleService from "./vehicle.service.js";

export const createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json({ success: true, data: vehicle });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      type: req.query.type,
      region: req.query.region,
    };
    const vehicles = await vehicleService.getAllVehicles(filters);
    res.status(200).json({ success: true, data: vehicles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    res.status(200).json({ success: true, data: vehicle });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json({ success: true, data: vehicle });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
    res.status(200).json({ success: true, message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const getDispatchEligibleVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getDispatchEligibleVehicles();
    res.status(200).json({ success: true, data: vehicles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};