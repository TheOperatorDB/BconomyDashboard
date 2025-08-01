import express from "express";
import { getItems } from "../services/itemsService.js";

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const items = await getItems();

    res.json({
      success: true,
      data: items,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
