import express from "express";
import { fetchBconomyResource } from "../services/bconomyService.js";

const router = express.Router();

let cachedTrophies = null;
let lastFetchTimestamp = null;
const ITEM_DATA_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchTrophies() {
  const now = Date.now();

  if (!cachedTrophies || now - lastFetchTimestamp > ITEM_DATA_CACHE_DURATION) {
    console.log("Fetching trophies data from Bconomy API...");

    cachedTrophies = await fetchBconomyResource("trophies", 1);

    lastFetchTimestamp = now;
  }

  return cachedTrophies;
}

router.get("/", async (req, res, next) => {
  try {
    const items = await fetchTrophies();

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
