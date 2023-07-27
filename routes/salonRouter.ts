import express from "express";

import * as salonController from "../controllers/salonController";

const router = express.Router();

router.post("/login", salonController.loginSalon);
router.post("/create", salonController.signUpSalon);
router.put("/:id", salonController.updateSalon);
router.get("/getSalon" , salonController.getSalonList);


export default router;
