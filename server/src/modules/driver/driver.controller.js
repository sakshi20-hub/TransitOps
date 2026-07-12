import driverService from './driver.service.js';
import { HTTP_STATUS } from '../../utils/constants.js';


export const createDriver = async (req, res, next) => {
  try {
    const driver = await driverService.createDriver(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Driver created successfully',
      data: { driver },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDrivers = async (req, res, next) => {
  try {
    const { status, licenseCategory } = req.query;

    const drivers = await driverService.getAllDrivers({ status, licenseCategory });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Drivers fetched successfully',
      data: { drivers },
    });
  } catch (error) {
    next(error);
  }
};


export const getAvailableDrivers = async (req, res, next) => {
  try {
    const drivers = await driverService.getDispatchEligibleDrivers();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Available drivers fetched successfully',
      data: { drivers },
    });
  } catch (error) {
    next(error);
  }
};


export const getDriverById = async (req, res, next) => {
  try {
    const driver = await driverService.getDriverById(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Driver fetched successfully',
      data: { driver },
    });
  } catch (error) {
    next(error);
  }
};


export const updateDriver = async (req, res, next) => {
  try {
    const driver = await driverService.updateDriver(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Driver updated successfully',
      data: { driver },
    });
  } catch (error) {
    next(error);
  }
};


export const deleteDriver = async (req, res, next) => {
  try {
    await driverService.deleteDriver(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Driver deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createDriver,
  getAllDrivers,
  getAvailableDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
