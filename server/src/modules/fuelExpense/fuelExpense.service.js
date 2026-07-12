import FuelLog from "../../models/FuelLog.js";
import Expense from "../../models/Expense.js";

export const addFuelLog = async (data) => {
  const fuelLog = await FuelLog.create(data);
  return fuelLog;
};

export const getFuelLogsByVehicle = async (vehicleId) => {
  return FuelLog.find({ vehicle: vehicleId }).sort({ date: -1 });
};

export const addExpense = async (data) => {
  const expense = await Expense.create(data);
  return expense;
};

export const getExpensesByVehicle = async (vehicleId) => {
  return Expense.find({ vehicle: vehicleId }).sort({ date: -1 });
};

export const getTotalOperationalCost = async (vehicleId) => {
  const fuelLogs = await FuelLog.find({ vehicle: vehicleId });
  const expenses = await Expense.find({ vehicle: vehicleId });

  const totalFuelCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0);
  const totalExpenseCost = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return {
    totalFuelCost,
    totalExpenseCost,
    totalCost: totalFuelCost + totalExpenseCost,
  };
};