import { fetchItems } from "./bconomyService.js";
import db from "../db/sqlite.js";

export function formatSource(source) {
  if (!source) return null;

  switch (source.toLowerCase()) {
    case "explore":
      return "Explore";
    case "mine":
      return "Mine";
    case "fish":
      return "Fish";
    case "hunt":
      return "Hunt";
    case "rare":
      return "Rare drop";
    case "item28":
      return "Ocean Bounty";
    case "item30":
      return "Fancy Crate";
    case "item83":
      return "Forest Bounty";
    case "item84":
      return "Hillside Bounty";
    case "item87":
      return "Cavern Bounty";
    case "item141":
      return "Exquisite Trunk";
    default:
      return source;
  }
}

export function getItemNameById(itemId) {
  if (!itemId) return null;

  const row = db.prepare("SELECT name FROM items WHERE id = ?").get(itemId);
  return row ? row.name : null;
}

export function getItems() {
  const rows = db.prepare("SELECT * FROM items").all();

  return rows.map((item) => ({
    ...item,
    lootSources: item.lootSources ? JSON.parse(item.lootSources) : [],
    craftability: item.uncraftable ? "Uncraftable" : "Craftable",
    cost: item.cost.toLocaleString("en-US"),
  }));
}

export async function fetchAndSaveItems() {
  console.log("Fetching and saving items from Bconomy API to the database...");

  const items = await fetchItems();

  const insert = db.prepare(`
      INSERT OR REPLACE INTO items (id, name, idName, uncraftable, lootSources, cost, imageUrl, imageBase64)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(
        item.id,
        item.name,
        item.idName || null,
        item.uncraftable ? 1 : 0,
        item.lootSources ? JSON.stringify(item.lootSources) : "[]",
        item.cost || null,
        item.imageUrl || null,
        item.imageBase64 || null
      );
    }
  });
  insertMany(items);
}
