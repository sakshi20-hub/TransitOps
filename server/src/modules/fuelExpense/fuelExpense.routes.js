import express from "express";
import * as fuelExpenseController from "./fuelExpense.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/rbacMiddleware.js";
import { ROLES } from "../../utils/constants.js";
const router = express.Router();

router.use(authenticate);

router.post("/fuel-log", authorize(ROLES.FLEET_MANAGER), fuelExpenseController.addFuelLog);
router.get("/fuel-log/:vehicleId", fuelExpenseController.getFuelLogsByVehicle);

router.post("/expense", authorize(ROLES.FLEET_MANAGER, ROLES.FINANCIAL_ANALYST), fuelExpenseController.addExpense);
router.get("/expense/:vehicleId", fuelExpenseController.getExpensesByVehicle);

router.get("/total-cost/:vehicleId", fuelExpenseController.getTotalOperationalCost);

export default router;