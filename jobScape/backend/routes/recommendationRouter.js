import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { recommendJobs, suggestSkills } from "../controllers/recommendationController.js";

const router = express.Router();

router.post("/recommend", isAuthenticated, recommendJobs);
router.post("/suggestSkills", isAuthenticated, suggestSkills);

export default router;
