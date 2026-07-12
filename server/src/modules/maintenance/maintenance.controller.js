import * as maintenanceService from "./maintenance.service.js";

export const createMaintenanceLog = async (req, res) => {
  try {
    const log = await maintenanceService.createMaintenanceLog(req.body);
    res.status(201).json({ success: true, data: log });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllMaintenanceLogs = async (req, res) => {
  try {
    const logs = await maintenanceService.getAllMaintenanceLogs({
      status: req.query.status,
      vehicle: req.query.vehicle,
    });
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMaintenanceLogById = async (req, res) => {
  try {
    const log = await maintenanceService.getMaintenanceLogById(req.params.id);
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const closeMaintenanceLog = async (req, res) => {
  try {
    const log = await maintenanceService.closeMaintenanceLog(req.params.id);
    res.status(200).json({ success: true, data: log });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};