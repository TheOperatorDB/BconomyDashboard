import express from "express";
import { fetchBconomyResource } from "../services/bconomyService.js";
import { getItemNameById } from "../services/itemsService.js";

const router = express.Router();

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatAdventureType(adventureType) {
  if (!adventureType) return "Resting";

  return capitalize(adventureType.toLowerCase());
}

export async function getPetsByUserId(userId, buddyId, req) {
  const userPets = await fetchBconomyResource("userPetsAndEggs", userId, req);
  if (!userPets || userPets.error) {
    return [];
  }

  var pets = userPets.pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    tier: pet.tier,
    species: capitalize(pet.species),
    generation: pet.generation,
    adventureType: formatAdventureType(pet.adventureType),
    skin: capitalize(pet.skin),
    aura: capitalize(pet.aura),
  }));

  pets = pets.slice().sort((a, b) => {
    if (buddyId) {
      if (a.id === buddyId) return -1;
      if (b.id === buddyId) return 1;
    }
    return a.name.localeCompare(b.name);
  });

  return pets;
}

router.get("/:id", async (req, res, next) => {
  try {
    const petId = parseInt(req.params.id);
    const data = await fetchBconomyResource("pet", petId, req);

    if (!data || data?.error) {
      return res.status(404).json({ error: "Pet not found" });
    }

    console.log(data);

    const sanitizedData = {
      ...data,
      adventureBoost: {
        multiplier: data.adventureBoost?.multiplier || 1,
        endTime: data.adventureBoost?.endTime
          ? new Date(data.adventureBoost.endTime).toISOString()
          : null,
      },
      xp: data.xp.toLocaleString("en-US"),
      lifetimeItemsFound: data.lifetimeItemsFound.toLocaleString("en-US"),
      skin: capitalize(data.skin),
      aura: capitalize(data.aura),
      species: capitalize(data.species),
      adventureType: formatAdventureType(data.adventureType),
      craving: {
        quantity: data.craving?.amount || 0,
        item: getItemNameById(parseInt(data.craving?.itemId)) || "Unknown",
      },
    };

    res.json({
      ...sanitizedData,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
