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
    const [pet, offsprings] = await Promise.all([
      fetchBconomyResource("pet", petId, req),
      fetchBconomyResource("petOffspring", petId),
    ]);

    if (!pet || pet?.error) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const sanitizedOwner =
      pet?.ownerBcId && pet?.ownerBcId !== "0"
        ? await fetchBconomyResource("user", pet.ownerBcId, req).then(
            (owner) => ({
              id: owner?.id,
              name: owner?.name || "Unknown",
            })
          )
        : null;

    const sanitizedData = {
      ...pet,
      owner: sanitizedOwner,
      adventureBoost: {
        multiplier: pet.adventureBoost?.multiplier || 1,
        endTime: pet.adventureBoost?.endTime
          ? new Date(pet.adventureBoost.endTime).toISOString()
          : null,
      },
      xp: pet.xp.toLocaleString("en-US"),
      lifetimeItemsFound: pet.lifetimeItemsFound.toLocaleString("en-US"),
      skin: capitalize(pet.skin),
      aura: capitalize(pet.aura),
      species: capitalize(pet.species),
      adventureType: formatAdventureType(pet.adventureType),
      craving: {
        quantity: pet.craving?.amount || 0,
        item: getItemNameById(parseInt(pet.craving?.itemId)) || "Unknown",
      },
      offsprings:
        offsprings?.pets?.map((offspring) => ({
          id: offspring.id,
          name: offspring.name,
          species: capitalize(offspring.species),
          generation: offspring.generation,
          skin: capitalize(offspring.skin),
          aura: capitalize(offspring.aura),
          tier: offspring.tier,
        })) || [],
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
