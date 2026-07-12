import express from "express";
import * as maintenanceController from "./maintenance.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/rbacMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", maintenanceController.getAllMaintenanceLogs);
router.get("/:id", maintenanceController.getMaintenanceLogById);

router.post("/", authorize("fleet_manager"), maintenanceController.createMaintenanceLog);
router.put("/:id/close", authorize("fleet_manager"), maintenanceController.closeMaintenanceLog);

export default router;