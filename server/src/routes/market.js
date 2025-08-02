import express from "express";
import { fetchBconomyResource } from "../services/bconomyService.js";

import db from "../db/sqlite.js";

const router = express.Router();

setInterval(fetchAndSaveMarketData, 5 * 60 * 1000);
async function fetchAndSaveMarketData() {
  const marketPreview = await fetchBconomyResource("marketPreview");

  if (marketPreview && marketPreview.data && marketPreview.lastUpdated) {
    const timestamp = marketPreview.lastUpdated;
    const data = marketPreview.data;

    const latest = db
      .prepare("SELECT timestamp FROM market ORDER BY timestamp DESC LIMIT 1")
      .get();
    if (!latest || latest.timestamp !== timestamp) {
      const stmt = db.prepare(
        `INSERT INTO market (itemId, price, timestamp) VALUES (?, ?, ?)`
      );
      for (const [itemId, price] of Object.entries(data)) {
        stmt.run(itemId.replace("item", ""), price, timestamp);
      }
    }
  }
}

router.get("/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;
    // Select and format timestamp as yyyy-mm-dd, order asc, and avoid duplicate timestamp for same itemId
    const marketData = db
      .prepare(
        `SELECT itemId, price, timestamp
         FROM market WHERE itemId = ?
         GROUP BY timestamp
         ORDER BY timestamp ASC`
      )
      .all(itemId);

    function formatChartTime(ts) {
      // Convert milliseconds to seconds
      return Math.floor(ts / 1000);
    }
    const formattedData = marketData.map((item) => ({
      time: formatChartTime(item.timestamp),
      value: item.price,
    }));

    res.json(formattedData);
  } catch (err) {
    next(err);
  }
});

export default router;
