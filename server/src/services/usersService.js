export function rankIdtoName(rankId) {
  if (!rankId) return null;

  switch (rankId) {
    case 1:
      return {
        emoji: "🥔",
        title: "Peasant",
      };
    case 2:
      return {
        emoji: "🗑️",
        title: "Bum",
      };
    case 3:
      return {
        emoji: "🧱",
        title: "Commoner",
      };
    case 4:
      return {
        emoji: "🏅",
        title: "Recruit",
      };
    case 5:
      return {
        emoji: "🎖️",
        title: "Ensign",
      };
    case 6:
      return {
        emoji: "🖊️",
        title: "Soldat",
      };
    case 7:
      return {
        emoji: "🗺️",
        title: "Captain",
      };
    case 8:
      return {
        emoji: "⚓",
        title: "Admiral",
      };
    case 9:
      return {
        emoji: "⛑️",
        title: "Warden",
      };
    case 10:
      return {
        emoji: "💰",
        title: "Governor",
      };
    case 11:
      return {
        emoji: "🛡️",
        title: "Viceroy",
      };
    case 12:
      return {
        emoji: "🔢",
        title: "Count",
      };
    case 13:
      return {
        emoji: "🥪",
        title: "Earl",
      };
    case 14:
      return {
        emoji: "🔮",
        title: "Magistrate",
      };
    case 15:
      return {
        emoji: "🐔",
        title: "Chanticleer",
      };
    case 16:
      return {
        emoji: "🖖",
        title: "Colonel",
      };
    case 17:
      return {
        emoji: "📎",
        title: "Commander",
      };
    case 18:
      return {
        emoji: "⚔️",
        title: "Knight",
      };
    case 19:
      return {
        emoji: "🔭",
        title: "Overseer",
      };
    case 20:
      return {
        emoji: "🥄",
        title: "Aristocrat",
      };
    case 21:
      return {
        emoji: "📌",
        title: "Kingpin",
      };
    case 22:
      return {
        emoji: "🕵️",
        title: "Agent",
      };
    case 23:
      return {
        emoji: "🧣",
        title: "Baron",
      };
    case 24:
      return {
        emoji: "🖇️",
        title: "Attache",
      };
    case 25:
      return {
        emoji: "📒",
        title: "Minister",
      };
    case 26:
      return {
        emoji: "👲",
        title: "Khagan",
      };
    case 27:
      return {
        emoji: "🎩",
        title: "Regent",
      };
    case 28:
      return {
        emoji: "🗿",
        title: "Taoiseach",
      };
    case 29:
      return {
        emoji: "🌈",
        title: "Politarch",
      };
    case 30:
      return {
        emoji: "💸",
        title: "Marquis",
      };
    case 31:
      return {
        emoji: "🦁",
        title: "Liege",
      };
    case 32:
      return {
        emoji: "💮",
        title: "Sovereign",
      };
    case 33:
      return {
        emoji: "⚜️",
        title: "Dauphin",
      };
    case 34:
      return {
        emoji: "🧿",
        title: "Primor",
      };
    case 35:
      return {
        emoji: "🤜",
        title: "Consul",
      };
    case 36:
      return {
        emoji: "🔺",
        title: "President",
      };
    case 37:
      return {
        emoji: "👑",
        title: "Ruler",
      };
    case 38:
      return {
        emoji: "🎺",
        title: "Herald",
      };
    case 39:
      return {
        emoji: "🌀",
        title: "Sentinel",
      };
    case 40:
      return {
        emoji: "✊",
        title: "Evincor",
      };
    case 41:
      return {
        emoji: "🌩️",
        title: "Legate",
      };
    case 42:
      return {
        emoji: "",
        title: "Arcanus",
      };
    case 43:
      return {
        emoji: "☄️",
        title: "Spirit",
      };
    case 44:
      return {
        emoji: "🏵️",
        title: "Legend",
      };
    case 45:
      return {
        emoji: "🌪️",
        title: "Harbinger",
      };
    case 46:
      return {
        emoji: "🎭",
        title: "Archon",
      };
    case 47:
      return {
        emoji: "💭",
        title: "Enlightened",
      };
    case 48:
      return {
        emoji: "🗻",
        title: "Paragon",
      };
    case 49:
      return {
        emoji: "👁️",
        title: "Quaesitor",
      };
    case 50:
      return {
        emoji: "🙏",
        title: "Prophet",
      };
    case 51:
      return {
        emoji: "🕯️",
        title: "Riftwalker",
      };
    case 52:
      return {
        emoji: "♾️",
        title: "Postmortal",
      };
    case 53:
      return {
        emoji: "💥",
        title: "Avatar",
      };
    case 54:
      return {
        emoji: "➿",
        title: "Eternal",
      };
    case 55:
      return {
        emoji: "⚖️",
        title: "Divine",
      };
    case 56:
      return {
        emoji: "🕊️",
        title: "Deity",
      };
    case 57:
      return {
        emoji: "⭐",
        title: "Demigod",
      };
    case 58:
      return {
        emoji: "🌟",
        title: "God",
      };
    default:
      return null;
  }
}

export function getPerkData() {
  return {
    lowerRankCost: {
      emoji: "🤝",
      title: "Nepotism",
      description: "Decreases the cost of ranking up",
      maxLevel: 20,
    },
    lowerTierCost: {
      emoji: "♐",
      title: "Anointment",
      description: "Decreases the cost of ascension",
      maxLevel: 20,
    },
    raiseRareItemMultiplier: {
      emoji: "🍀",
      title: "Fortuity",
      description: "Increases Rare Item discovery multiplier",
      maxLevel: 29,
    },
    raiseWorkBonusChance: {
      emoji: "😇",
      title: "Favoritism",
      description: "Increases the chance for a Work Bonus to occur",
      maxLevel: 13,
    },
    raisePetMaxTier: {
      emoji: "♉",
      title: "Asterism",
      description: "Increases max Tier a Pet can reincarnate into",
      maxLevel: 15,
    },
    lowerWaterFarmCooldown: {
      emoji: "☔",
      title: "Deluge",
      description: "Lower cooldown between watering your farm",
      maxLevel: 4,
    },
    raiseMaxSameItemPlanted: {
      emoji: "🎋",
      title: "Arbory",
      description:
        "Increases max number of one type of crop that can be planted at once",
      maxLevel: 22,
    },
    raisePetSpace: {
      emoji: "🎪",
      title: "Menager",
      description:
        "Increases Pet and Egg space (does NOT increase adventure slots)",
      maxLevel: 200,
    },
    lowerBuddySwapCooldown: {
      emoji: "😘",
      title: "Playboy",
      description: "Lower cooldown between swapping your Buddy",
      maxLevel: 3,
    },
    raiseCoinflipLimit: {
      emoji: "🥮",
      title: "Numismatist",
      description: "Increases your BC per Coinflip limit",
      maxLevel: 19,
    },
    raiseEquipSlots: {
      emoji: "🔨",
      title: "Hammerspace",
      description: "Increases number of items that can be equipped at once",
      maxLevel: 74,
    },
    raiseGeneratorIdleTime: {
      emoji: "🤖",
      title: "Hypervisor",
      description: "Increases time Generators can run before idling",
      maxLevel: 21,
    },
    raiseFarmCropsDieTime: {
      emoji: "🌼",
      title: "Vitality",
      description: "Increases time Farm can survive between watering",
      maxLevel: 21,
    },
    raisePetCravingXpMultiplier: {
      emoji: "🧑‍🍳",
      title: "Gourmand",
      description: "Increases XP multiplier from Pet's craving",
      maxLevel: 25,
    },
    raiseChanceToIgnoreCooldownForAction: {
      emoji: "😵‍💫",
      title: "Amnesiac",
      description:
        "Increases chance of an action's cooldown being ignored when run",
      maxLevel: 20,
    },
    raisePetFeedAdditionalItemOutput: {
      emoji: "🤢",
      title: "Fecality",
      description: "Increases Manure output from feeding a Pet",
      maxLevel: 5,
    },
    raiseFarmHarvestAdditionalItemOutput: {
      emoji: "🌱",
      title: "Fecundity",
      description: "Increases rare crop output from Farm",
      maxLevel: 5,
    },
    lowerPetBreedCooldown: {
      emoji: "🌶️",
      title: "Virility",
      description: "Skip wait time for breeding a Pet",
      maxLevel: 100,
    },
    raisePetEnergyCapacity: {
      emoji: "🤤",
      title: "Gluttony",
      description: "Increase Pet Energy Capacity",
      maxLevel: 10,
    },
    lowerPetBreedCost: {
      emoji: "🧬",
      title: "Zootechny",
      description: "Reduce Pet breed costs",
      maxLevel: 19,
    },
    raiseToolAugmentationSlots: {
      emoji: "💎",
      title: "Lapidist",
      description: "Increase Tool Augmentation slots",
      maxLevel: 4,
    },
    raiseFarmWaterByproducts: {
      emoji: "🌾",
      title: "Overgrowth",
      description: "Increase Farm water byproducts",
      maxLevel: 20,
    },
    raiseMarketAccessLevel: {
      emoji: "💹",
      title: "Mercantilist",
      description: "Unlocks sell access to Item markets",
      maxLevel: 55,
    },
    raiseMaxDailyReward: {
      emoji: "🙏",
      title: "Loyalist",
      description: "Increases max of each Item earned from Daily",
      maxLevel: 25,
    },
    reduceMarketTransactionFee: {
      emoji: "🕶️",
      title: "Insider",
      description: "Decreases Market transaction fee",
      maxLevel: 50,
    },
  };
}
