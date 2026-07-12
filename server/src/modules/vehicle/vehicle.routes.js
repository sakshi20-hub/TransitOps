import express from "express";
import rbacMiddleware from "../../middlewares/rbacMiddleware.js";
import * as vehicleController from "./vehicle.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { ROLES } from "../../utils/constants.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", vehicleController.getAllVehicles);
router.get("/dispatch-eligible", vehicleController.getDispatchEligibleVehicles);
router.get("/:id", vehicleController.getVehicleById);

router.post("/", rbacMiddleware(ROLES.FLEET_MANAGER), vehicleController.createVehicle);
router.put("/:id", rbacMiddleware(ROLES.FLEET_MANAGER), vehicleController.updateVehicle);
router.delete("/:id", rbacMiddleware(ROLES.FLEET_MANAGER), vehicleController.deleteVehicle);

export default router;
