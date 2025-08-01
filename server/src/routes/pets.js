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

  switch (adventureType.toLowerCase()) {
    case "fish":
      return "Fishing";
    case "mine":
      return "Mining";
    case "hunt":
      return "Hunting";
    case "explore":
      return "Exploring";
    default:
      return "Resting";
  }
}

export async function getPetsByUserId(userId, buddyId) {
  const userPets = await fetchBconomyResource("userPetsAndEggs", userId);
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

  // Move buddy pet to the top
  if (buddyId) {
    pets = pets.slice().sort((a, b) => {
      if (a.id === buddyId) return -1;
      if (b.id === buddyId) return 1;
      return 0;
    });
  }

  return pets;
}

router.get("/:id", async (req, res, next) => {
  try {
    const petId = parseInt(req.params.id);
    const data = await fetchBconomyResource("pet", petId);

    if (!data || data?.error) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const sanitizedData = {
      ...data,
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
