import analyticsService from './analytics.service.js';
import { HTTP_STATUS } from '../../utils/constants.js';

/**
 * GET /api/analytics/dashboard
 * Supports optional ?type= &status= &region= query filters.
 */
export const getDashboardKpis = async (req, res, next) => {
  try {
    const { type, status, region } = req.query;

    const kpis = await analyticsService.getDashboardKpis({ type, status, region });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Dashboard KPIs fetched successfully',
      data: { kpis },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/analytics/reports
 * Returns per-vehicle Fuel Efficiency, Operational Cost, and ROI.
 */
export const getReports = async (req, res, next) => {
  try {
    const reports = await analyticsService.getVehicleReports();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Reports fetched successfully',
      data: { reports },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/analytics/reports/export
 * Streams the vehicle reports as a downloadable CSV file.
 */
export const exportReportsCsv = async (req, res, next) => {
  try {
    const reports = await analyticsService.getVehicleReports();
    const csv = analyticsService.buildVehicleReportsCsv(reports);

    res.status(HTTP_STATUS.OK);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="vehicle-reports.csv"');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

export default {
  getDashboardKpis,
  getReports,
  exportReportsCsv,
};
