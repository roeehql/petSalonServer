import express from "express";

import * as reservationController from "../controllers/reservationController";
import { validateToken } from "../middleware/validateToken";

const router = express.Router();

router.use(validateToken);

router.get("/", reservationController.getReservations);
router.post("/", reservationController.createReservation);
router.get("/:id", reservationController.getReservationByTel);
router.put("/:id", reservationController.updateReservation);
router.delete("/:id", reservationController.deleteReservation);
router.post("/byShop", reservationController.getReservationByShop);

export default router;
