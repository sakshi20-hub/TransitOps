import express from "express";
import * as fuelExpenseController from "./fuelExpense.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/rbacMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/fuel-log", authorize("fleet_manager"), fuelExpenseController.addFuelLog);
router.get("/fuel-log/:vehicleId", fuelExpenseController.getFuelLogsByVehicle);

router.post("/expense", authorize("fleet_manager", "financial_analyst"), fuelExpenseController.addExpense);
router.get("/expense/:vehicleId", fuelExpenseController.getExpensesByVehicle);

router.get("/total-cost/:vehicleId", fuelExpenseController.getTotalOperationalCost);

export default router;