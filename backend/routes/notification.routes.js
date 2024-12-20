import express from "express";

import {
  getAllNotifications,
  deleteAllNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getAllNotifications);
router.delete("/", deleteAllNotifications);

export default router;
