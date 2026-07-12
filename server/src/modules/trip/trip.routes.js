import express from "express";
import * as tripController from "./trip.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/rbacMiddleware.js";
import { ROLES } from "../../utils/constants.js";
const router = express.Router();

router.use(authenticate);

router.get("/", tripController.getAllTrips);
router.get("/:id", tripController.getTripById);

router.post("/", authorize(ROLES.DRIVER), tripController.createTrip);
router.put("/:id/dispatch", authorize(ROLES.DRIVER), tripController.dispatchTrip);
router.put("/:id/complete", authorize(ROLES.DRIVER), tripController.completeTrip);
router.put("/:id/cancel", authorize(ROLES.DRIVER), tripController.cancelTrip);

export default router;