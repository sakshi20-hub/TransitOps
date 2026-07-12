import * as tripService from "./trip.service.js";

export const createTrip = async (req, res) => {
  try {
    const trip = await tripService.createTrip(req.body);
    res.status(201).json({ success: true, data: trip });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await tripService.getAllTrips({ status: req.query.status });
    res.status(200).json({ success: true, data: trips });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await tripService.getTripById(req.params.id);
    res.status(200).json({ success: true, data: trip });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const dispatchTrip = async (req, res) => {
  try {
    const trip = await tripService.dispatchTrip(req.params.id);
    res.status(200).json({ success: true, data: trip });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const completeTrip = async (req, res) => {
  try {
    const trip = await tripService.completeTrip(req.params.id, req.body);
    res.status(200).json({ success: true, data: trip });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const cancelTrip = async (req, res) => {
  try {
    const trip = await tripService.cancelTrip(req.params.id);
    res.status(200).json({ success: true, data: trip });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
