export function getTitleDetails(titleId) {
  if (!titleId) return null;

  switch (titleId.trophyId) {
    case "bossKillingBlow":
      return {
        emoji: "🩸",
        title: "Slayer",
        desc: "Delivered Killing Blow on a Boss",
      };

    // Income related titles
    case "topDayIncome":
      return {
        emoji: "👔",
        title: "Boss",
        desc: "#1 Daily Income",
      };
    case "topWeekIncome":
      return {
        emoji: "🕴",
        title: "CEO",
        desc: "#1 Weekly Income",
      };

    // Burn related titles
    case "topDayBurn":
      return {
        emoji: "🐉",
        title: "Burninator",
        desc: "#1 Daily Burn",
      };
    case "topWeekBurn":
      return {
        emoji: "🎇",
        title: "Pyromaniac",
        desc: "#1 Weekly Burn",
      };

    // Coinflip related titles
    case "topDayBet":
      return {
        emoji: "🎰",
        title: "High Roller",
        desc: "#1 Daily Coinflip",
      };
    case "topWeekBet":
      return {
        emoji: "🃏",
        title: "Card Shark",
        desc: "#1 Weekly Coinflip",
      };

    case "dust":
      return {
        emoji: "🍀",
        title: "Lucky",
        desc: "Find a Rare Item",
      };
    case "findSpecial":
      return {
        emoji: "🪩",
        title: "Special",
        desc: "Find a Special",
      };
    case "donor":
      return {
        emoji: "🎁",
        title: "Kindly",
        desc: "Bconomy Supporter (You're awesome)",
      };
    case "lotwin":
      return {
        emoji: "🤵",
        title: "Baller",
        desc: "Ball Pit Winner",
      };
    case "based":
      return {
        emoji: "😏",
        title: "Based",
        desc: "Unfathomably Based",
      };
    case "composer":
      return {
        emoji: "🎹",
        title: "Composer",
        desc: "Bconomy Soundtrack Composer",
      };
    case "bcbeta":
      return {
        emoji: "👷",
        title: "Engineer",
        desc: "v6 Launch Beta Tester",
      };

    // End of Season titles
    case "topSeasonQuestLevel":
      return {
        emoji: "🛤️",
        title: "Trailblazer",
        desc: "#1 Season Quest Lv.",
      };
    case "top10SeasonQuestLevel":
      return {
        emoji: "🏞️",
        title: "Pioneer",
        desc: "Top 10 Season Quest Lv.",
      };

    // Summer 2022 Event titles
    case "summer2022Event":
      return {
        emoji: "🛥️",
        title: "Seaworthy",
        desc: "Summer 2022 Event Participant",
      };

    // Winter 2024 Event titles
    case "winter2024Lv125":
      return {
        emoji: "🌨️",
        title: "Wintry",
        desc: "Winter 2024 Event (Lv. 125)",
      };
    case "winter2024Lv250":
      return {
        emoji: "❄️",
        title: "Frosty",
        desc: "Winter 2024 Event (Lv. 250)",
      };
    case "winter2024Lv375":
      return {
        emoji: "🧊",
        title: "Ice Cold",
        desc: "Winter 2024 Event (Lv. 375)",
      };
    case "winter2024Lv500":
      return {
        emoji: "🥶",
        title: "Subzero",
        desc: "Winter 2024 Event (Lv. 500)",
      };

    // Spring 2025 Event titles
    case "spring2025Lv250":
      return {
        emoji: "🐣",
        title: "Hatchling",
        desc: "Spring 2025 Event (Lv. 250)",
      };
    case "spring2025Lv500":
      return {
        emoji: "🐤",
        title: "Spring Chicken",
        desc: "Spring 2025 Event (Lv. 500)",
      };
    case "spring2025Lv750":
      return {
        emoji: "🐓",
        title: "Rooster",
        desc: "Spring 2025 Event (Lv. 750)",
      };
    case "spring2025Lv1000":
      return {
        emoji: "🦤",
        title: "Dodo",
        desc: "Spring 2025 Event (Lv. 1000)",
      };

    // Bconomy SMP 2025 related titles
    case "bconomySmp2025":
      return {
        emoji: "🟦",
        title: "Blocky",
        desc: "2025 SMP Event Winner",
      };

    // Summer 2025 Event titles
    case "summer2025Lv125":
      return {
        emoji: "🪐",
        title: "Cosmic",
        desc: "Summer 2025 Event (Lv. 125)",
      };
    case "summer2025Lv250":
      return {
        emoji: "🧑‍🚀",
        title: "Intrepid",
        desc: "Summer 2025 Event (Lv. 250)",
      };
    case "summer2025Lv500":
      return {
        emoji: "🌠",
        title: "Starstruck",
        desc: "Summer 2025 Event (Lv. 500)",
      };
    case "summer2025Lv1000":
      return {
        emoji: "👽",
        title: "Extraterrestrial",
        desc: "Summer 2025 Event (Lv. 1000)",
      };

    // Pet collection related titles
    case "dolphinCollector":
      return {
        emoji: "🐬",
        title: "Dolphin",
        desc: "All Dolphin Skins Collected",
      };
    case "otterCollector":
      return {
        emoji: "🦦",
        title: "Otter",
        desc: "All Otter Skins Collected",
      };
    case "gooseCollector":
      return {
        emoji: "🪿",
        title: "Goose",
        desc: "All Goose Skins Collected",
      };
    case "sealCollector":
      return {
        emoji: "🦭",
        title: "Seal",
        desc: "All Seal Skins Collected",
      };
    case "whaleCollector":
      return {
        emoji: "🐳",
        title: "Whale",
        desc: "All Whale Skins Collected",
      };
    case "turtleCollector":
      return {
        emoji: "🐢",
        title: "Turtle",
        desc: "All Turtle Skins Collected",
      };
    case "eagleCollector":
      return {
        emoji: "🦅",
        title: "Eagle",
        desc: "All Eagle Skins Collected",
      };
    case "tigerCollector":
      return {
        emoji: "🐅",
        title: "Tiger",
        desc: "All Tiger Skins Collected",
      };
    case "gorillaCollector":
      return {
        emoji: "🦍",
        title: "Gorilla",
        desc: "All Gorilla Skins Collected",
      };
    case "crocodileCollector":
      return {
        emoji: "🐊",
        title: "Crocodile",
        desc: "All Crocodile Skins Collected",
      };
    case "snakeCollector":
      return {
        emoji: "🐍",
        title: "Snake",
        desc: "All Snake Skins Collected",
      };
    case "poodleCollector":
      return {
        emoji: "🐩",
        title: "Poodle",
        desc: "All Poodle Skins Collected",
      };
    case "dogCollector":
      return {
        emoji: "🐕",
        title: "Dog",
        desc: "All Dog Skins Collected",
      };
    case "mustangCollector":
      return {
        emoji: "🐎",
        title: "Mustang",
        desc: "All Mustang Skins Collected",
      };
    case "pigCollector":
      return {
        emoji: "🐖",
        title: "Pig",
        desc: "All Pig Skins Collected",
      };
    case "peacockCollector":
      return {
        emoji: "🦚",
        title: "Peacock",
        desc: "All Peacock Skins Collected",
      };
    case "donkeyCollector":
      return {
        emoji: "🫏",
        title: "Donkey",
        desc: "All Donkey Skins Collected",
      };
    case "oxCollector":
      return {
        emoji: "🐂",
        title: "Ox",
        desc: "All Ox Skins Collected",
      };
    case "junglefowlCollector":
      return {
        emoji: "🐓",
        title: "Junglefowl",
        desc: "All Junglefowl Skins Collected",
      };
    case "rabbitCollector":
      return {
        emoji: "🐇",
        title: "Rabbit",
        desc: "All Rabbit Skins Collected",
      };
    case "doveCollector":
      return {
        emoji: "🕊️",
        title: "Dove",
        desc: "All Dove Skins Collected",
      };
    case "kangarooCollector":
      return {
        emoji: "🦘",
        title: "Kangaroo",
        desc: "All Kangaroo Skins Collected",
      };
    case "batCollector":
      return {
        emoji: "🦇",
        title: "Bat",
        desc: "All Bat Skins Collected",
      };
    case "ratCollector":
      return {
        emoji: "🐀",
        title: "Rat",
        desc: "All Rat Skins Collected",
      };
    case "snailCollector":
      return {
        emoji: "🐌",
        title: "Snail",
        desc: "All Snail Skins Collected",
      };
    case "lizardCollector":
      return {
        emoji: "🦎",
        title: "Lizard",
        desc: "All Lizard Skins Collected",
      };
    case "dragonCollector":
      return {
        emoji: "🐉",
        title: "Dragon",
        desc: "All Dragon Skins Collected",
      };
    case "phoenixCollector":
      return {
        emoji: "🐦‍🔥",
        title: "Phoenix",
        desc: "All Phoenix Skins Collected",
      };
    case "visitorCollector":
      return {
        emoji: "🛸",
        title: "Visitor",
        desc: "All Visitor Skins Collected",
      };
    case "invaderCollector":
      return {
        emoji: "👾",
        title: "Invader",
        desc: "All Invader Skins Collected",
      };
    case "scorpionCollector":
      return {
        emoji: "🦂",
        title: "Scorpion",
        desc: "All Scorpion Skins Collected",
      };

    // Wewert related titles
    case "wewert":
      return {
        emoji: "🔪",
        title: "Traitor",
        desc: "Robbed the Developer",
      };

    case "wewertTwo":
      return {
        emoji: "😇",
        title: "Chosen",
        desc: "Chosen by the Developer",
      };
    default:
      return null;
  }
}
