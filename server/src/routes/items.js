import express from "express";
import { getItems } from "../services/itemsService.js";

const router = express.Router();

router.get("/select", async (_, res, next) => {
  try {
    const items = await getItems();

    res.json({
      success: true,
      data: items.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    });
  } catch (err) {
    next(err);
  }
});

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
