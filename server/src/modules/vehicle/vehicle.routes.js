<<<<<<< HEAD
export {}
=======
import express from "express";
import * as vehicleController from "./vehicle.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/rbacMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", vehicleController.getAllVehicles);
router.get("/dispatch-eligible", vehicleController.getDispatchEligibleVehicles);
router.get("/:id", vehicleController.getVehicleById);

router.post("/", authorize("fleet_manager"), vehicleController.createVehicle);
router.put("/:id", authorize("fleet_manager"), vehicleController.updateVehicle);
router.delete("/:id", authorize("fleet_manager"), vehicleController.deleteVehicle);

export default router;
>>>>>>> origin/main
