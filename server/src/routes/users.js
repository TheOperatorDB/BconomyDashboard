import express from "express";
import BigNumber from "bignumber.js";

import { fetchBconomyResource } from "../services/bconomyService.js";
import { getTitleDetails } from "../services/titleService.js";
import { getEffectTitle } from "../services/effectsService.js";
import { getItems } from "../services/itemsService.js";
import { getPerkData, rankIdtoName } from "../services/usersService.js";
import { getPetsByUserId } from "./pets.js";

const router = express.Router();

async function getUserPerks(perks) {
  if (!perks || Object.keys(perks).length === 0) return [];

  var sanitizedPerks = [];

  const allPerkKeys = Object.entries(getPerkData());

  allPerkKeys.forEach(([key, perk]) => {
    sanitizedPerks.push({
      title: perk.title,
      level: perks[key] || 0,
      maxLevel: perk.maxLevel,
      description: perk.description,
    });
  });

  sanitizedPerks.sort((a, b) => a.title.localeCompare(b.title));

  return sanitizedPerks;
}

async function getUserEffects(effects) {
  if (!effects || Object.keys(effects).length === 0) return [];

  var sanitizedEffects = [];

  Object.entries(effects).forEach(([key, value]) => {
    const effect = getEffectTitle(key, value);
    if (effect) {
      sanitizedEffects.push(effect);
    }
  });

  sanitizedEffects.sort((a, b) => {
    if (a.multiplier !== b.multiplier) {
      return b.multiplier - a.multiplier;
    }

    if (a.action === null && b.action !== null) return 1;
    if (a.action !== null && b.action === null) return -1;
    if (a.action !== b.action) {
      return a.action.localeCompare(b.action);
    }

    return a.title.localeCompare(b.title);
  });

  return sanitizedEffects;
}

async function getUserProfile(userId) {
  const userProfile = await fetchBconomyResource("user", userId);
  if (!userProfile || userProfile?.error) return null;

  const profile = {
    id: userProfile?.id || userId,
    title: getTitleDetails(userProfile?.settings?.title),
    name: userProfile?.name,
    rank: rankIdtoName(userProfile?.rank),
    tier: `Tier ${userProfile?.tier}`,
    bc: userProfile?.bc?.toLocaleString("en-US") || "0",
    sp: userProfile?.sp?.toLocaleString("en-US") || "0",
    kr: userProfile?.kr?.toLocaleString("en-US") || "0",
    buddyId: userProfile?.buddyId || null,
    nbFarmPlots: userProfile?.farmPlots?.length || 0,
    nbFarmPlotsExtra:
      userProfile?.farmPlots?.filter((plot) => plot.isExtra)?.length || 0,
    nbGenerators: userProfile?.generators?.length || 0,
    nbGeneratorsExtra:
      userProfile?.generators?.filter((gen) => gen.isExtra)?.length || 0,
    nbStables: userProfile?.upgrades?.petsStable || 0,
    nbStablesExtra: userProfile?.upgrades?.petsStableExtra || 0,
    factionTag: userProfile?.factionTag || null,
    upgrades: userProfile?.upgrades,
    registrationDate: userProfile?.registrationDate,
  };

  const effects = await getUserEffects(userProfile?.effects);
  const perks = await getUserPerks(userProfile?.perks);

  return {
    profile: profile,
    effects: effects,
    perks: perks,
  };
}

async function getMarketInventory(userId, buddyId) {
  const items = await getItems();

  const [userInventory, marketData, userMarketListings] = await Promise.all([
    fetchBconomyResource("flatInventory", userId),
    fetchBconomyResource("marketPreview"),
    fetchBconomyResource("userMarketListings", userId),
  ]);

  const listings = {};
  userMarketListings.forEach((listing) => {
    if (!listings[listing.itemId]) {
      listings[listing.itemId] = 0;
    }
    listings[listing.itemId] += listing.amount;
  });

  var groupedListings = Object.entries(listings).map(([itemId, amount]) => ({
    itemId: parseInt(itemId),
    amount,
  }));

  if (!userInventory || userInventory?.error) return null;
  if (!marketData || marketData?.error) return null;

  const userTotalInventory = [];

  Object.entries(marketData.data).forEach(([key, value]) => {
    const itemId = parseInt(key.replace("item", ""));
    const item = items.find((item) => item.id === itemId);

    const marketListings =
      groupedListings.find((listing) => listing.itemId === itemId)?.amount || 0;

    userTotalInventory.push({
      itemId: itemId,
      itemName: item?.name || `Unknown Item ${itemId}`,
      imageUrl: item?.imageUrl || null,
      imageBase64: item?.imageBase64 || null,
      quantity: (userInventory?.[key] || 0).toLocaleString("en-US") || "0",
      marketQuantity: marketListings.toLocaleString("en-US") || "0",
      totalMarketValue:
        new BigNumber(
          value * (userInventory?.[key] ?? 0 + marketListings)
        ).toFormat(0) || "0",
    });
  });

  userTotalInventory.sort((a, b) => {
    const aVal = new BigNumber(a.totalMarketValue.replace(/,/g, "") || "0");
    const bVal = new BigNumber(b.totalMarketValue.replace(/,/g, "") || "0");
    return bVal.comparedTo(aVal);
  });

  return userTotalInventory;
}

async function getUser(userId) {
  const user = await getUserProfile(userId);
  if (!user || user?.error) return null;

  let pets = await getPetsByUserId(userId, user.profile.buddyId);

  return {
    ...user,
    marketInventory: await getMarketInventory(userId),
    pets: pets,
  };
}

router.get("/:id", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userInventory = await getUser(userId);

    if (!userInventory || userInventory?.error) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userInventory);
  } catch (err) {
    next(err);
  }
});

export default router;
