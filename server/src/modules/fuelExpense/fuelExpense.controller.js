import * as fuelExpenseService from "./fuelExpense.service.js";

export const addFuelLog = async (req, res) => {
  try {
    const fuelLog = await fuelExpenseService.addFuelLog(req.body);
    res.status(201).json({ success: true, data: fuelLog });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getFuelLogsByVehicle = async (req, res) => {
  try {
    const fuelLogs = await fuelExpenseService.getFuelLogsByVehicle(req.params.vehicleId);
    res.status(200).json({ success: true, data: fuelLogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const expense = await fuelExpenseService.addExpense(req.body);
    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getExpensesByVehicle = async (req, res) => {
  try {
    const expenses = await fuelExpenseService.getExpensesByVehicle(req.params.vehicleId);
    res.status(200).json({ success: true, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTotalOperationalCost = async (req, res) => {
  try {
    const cost = await fuelExpenseService.getTotalOperationalCost(req.params.vehicleId);
    res.status(200).json({ success: true, data: cost });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};