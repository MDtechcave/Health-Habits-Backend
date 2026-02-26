import express from 'express'
import { getDashboardStats, getRecentOrders } from "../controllers/adminCon.js";

const router = express.Router();

router.get("/stats", getDashboardStats)
router.get("/orders/recent", getRecentOrders);

export default router;