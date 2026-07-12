import Vehicle from '../../models/Vehicle.js';
import Driver from '../../models/Driver.js';
import Trip from '../../models/Trip.js';
import MaintenanceLog from '../../models/MaintenanceLog.js';
import FuelLog from '../../models/FuelLog.js';
import { VEHICLE_STATUS, DRIVER_STATUS, TRIP_STATUS } from '../../utils/constants.js';

// -------------------- Dashboard KPIs --------------------


export const getDashboardKpis = async (filter = {}) => {
  const vehicleFilter = {};
  if (filter.type) vehicleFilter.type = filter.type;
  if (filter.status) vehicleFilter.status = filter.status;

  const [
    activeVehicles,
    availableVehicles,
    vehiclesInMaintenance,
    activeTrips,
    pendingTrips,
    driversOnDuty,
    totalNonRetiredVehicles,
    vehiclesOnTrip,
  ] = await Promise.all([
    Vehicle.countDocuments({ ...vehicleFilter, status: { $ne: VEHICLE_STATUS.RETIRED } }),
    Vehicle.countDocuments({ ...vehicleFilter, status: VEHICLE_STATUS.AVAILABLE }),
    Vehicle.countDocuments({ ...vehicleFilter, status: VEHICLE_STATUS.IN_SHOP }),
    Trip.countDocuments({ status: TRIP_STATUS.DISPATCHED }),
    Trip.countDocuments({ status: TRIP_STATUS.DRAFT }),
    Driver.countDocuments({ status: DRIVER_STATUS.ON_TRIP }),
    Vehicle.countDocuments({ status: { $ne: VEHICLE_STATUS.RETIRED } }),
    Vehicle.countDocuments({ status: VEHICLE_STATUS.ON_TRIP }),
  ]);

  const fleetUtilization =
    totalNonRetiredVehicles > 0
      ? Number(((vehiclesOnTrip / totalNonRetiredVehicles) * 100).toFixed(2))
      : 0;

  return {
    activeVehicles,
    availableVehicles,
    vehiclesInMaintenance,
    activeTrips,
    pendingTrips,
    driversOnDuty,
    fleetUtilizationPercent: fleetUtilization,
  };
};

// -------------------- Reports --------------------


export const getVehicleReports = async () => {
  const vehicles = await Vehicle.find();

  const reports = await Promise.all(
    vehicles.map(async (vehicle) => {
      const [completedTrips, fuelLogs, maintenanceLogs] = await Promise.all([
        Trip.find({ vehicleId: vehicle._id, status: TRIP_STATUS.COMPLETED }),
        FuelLog.find({ vehicleId: vehicle._id }),
        MaintenanceLog.find({ vehicleId: vehicle._id }),
      ]);

      const totalDistance = completedTrips.reduce(
        (sum, trip) => sum + (trip.plannedDistance || 0),
        0
      );
      const totalFuelLiters = fuelLogs.reduce((sum, log) => sum + (log.liters || 0), 0);
      const totalFuelCost = fuelLogs.reduce((sum, log) => sum + (log.cost || 0), 0);
      const totalMaintenanceCost = maintenanceLogs.reduce(
        (sum, log) => sum + (log.cost || 0),
        0
      );
      const totalRevenue = completedTrips.reduce((sum, trip) => sum + (trip.revenue || 0), 0);

      const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;
      const operationalCost = totalFuelCost + totalMaintenanceCost;
      const roi =
        vehicle.acquisitionCost > 0
          ? (totalRevenue - operationalCost) / vehicle.acquisitionCost
          : 0;

      return {
        vehicleId: vehicle._id,
        registrationNumber: vehicle.registrationNumber,
        name: vehicle.name,
        type: vehicle.type,
        status: vehicle.status,
        totalDistance,
        totalFuelLiters,
        fuelEfficiency: Number(fuelEfficiency.toFixed(2)),
        totalFuelCost,
        totalMaintenanceCost,
        operationalCost,
        totalRevenue,
        roi: Number(roi.toFixed(4)),
      };
    })
  );

  return reports;
};


export const buildVehicleReportsCsv = (reports) => {
  const headers = [
    'registrationNumber',
    'name',
    'type',
    'status',
    'totalDistance',
    'totalFuelLiters',
    'fuelEfficiency',
    'totalFuelCost',
    'totalMaintenanceCost',
    'operationalCost',
    'totalRevenue',
    'roi',
  ];

  const escapeCsvValue = (value) => {
    const stringValue = String(value ?? '');
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const rows = reports.map((report) =>
    headers.map((header) => escapeCsvValue(report[header])).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
};

export default {
  getDashboardKpis,
  getVehicleReports,
  buildVehicleReportsCsv,
};
