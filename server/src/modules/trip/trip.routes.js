import express from "express";
import * as tripController from "./trip.controller.js";
import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/rbacMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", tripController.getAllTrips);
router.get("/:id", tripController.getTripById);

router.post("/", authorize("driver"), tripController.createTrip);
router.put("/:id/dispatch", authorize("driver"), tripController.dispatchTrip);
router.put("/:id/complete", authorize("driver"), tripController.completeTrip);
router.put("/:id/cancel", authorize("driver"), tripController.cancelTrip);

export default router;