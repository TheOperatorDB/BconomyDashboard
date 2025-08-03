import axios from "axios";
import { config } from "../config/index.js";
import { fetchAndSaveItems } from "./itemsService.js";
import { formatSource } from "./itemsService.js";

const BCONOMY_API_URL = "https://bconomy.net/api/data";

fetchAndSaveItems();
setInterval(fetchAndSaveItems, 24 * 60 * 60 * 1000);

export async function fetchItems() {
  var items = await fetchBconomyResource("itemData");

  items = await Promise.all(
    items.map(async (item) => {
      let imageBase64 = null;

      if (item.imageUrl?.endsWith(".webp")) {
        try {
          const response = await fetch(item.imageUrl);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            imageBase64 = `data:${response.headers.get(
              "content-type"
            )};base64,${buffer.toString("base64")}`;
          }
        } catch (e) {
          console.error(`Failed to fetch image for item ${item.id}:`, e);
        }
      }

      return {
        ...item,
        lootSources: Array.isArray(item.lootSources)
          ? item.lootSources.map(formatSource)
          : item.lootSources,
        imageBase64,
      };
    })
  );

  return items;
}

export async function fetchBconomyResource(
  resourceType,
  id = null,
  req = null
) {
  try {
    const requestBody = id
      ? { type: resourceType, id }
      : { type: resourceType };

    const response = await axios.post(BCONOMY_API_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": req?.userApiKey || config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Bconomy API error [${resourceType}]:`, error.message);

    return {
      error: true,
    };
  }
}
