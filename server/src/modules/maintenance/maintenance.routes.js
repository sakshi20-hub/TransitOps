import express from "express";
import * as maintenanceController from "./maintenance.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/rbacMiddleware.js";
import { ROLES } from "../../utils/constants.js";
const router = express.Router();

router.use(authenticate);

router.get("/", maintenanceController.getAllMaintenanceLogs);
router.get("/:id", maintenanceController.getMaintenanceLogById);

router.post("/", authorize(ROLES.FLEET_MANAGER), maintenanceController.createMaintenanceLog);
router.put("/:id/close", authorize(ROLES.FLEET_MANAGER), maintenanceController.closeMaintenanceLog);

export default router;