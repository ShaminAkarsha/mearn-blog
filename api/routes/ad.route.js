import express from "express";
import { create, deletead, getads } from "../controllers/ad.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getads", getads);
router.delete("/deletead/:adId/", verifyToken, deletead);

export default router;
