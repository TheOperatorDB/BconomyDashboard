import { getItemNameById } from "./itemsService.js";

function sanitizeAction(action) {
  if (!action) return null;

  switch (action) {
    case "fish":
      return "Fishing";
    case "hunt":
      return "Hunting";
    case "explore":
      return "Exploring";
    case "mine":
      return "Mining";
    default:
      return `Unknown ${action}`;
  }
}

function formatEffectEndTime(endTime) {
  const now = Date.now();
  const diff = endTime - now;

  if (diff <= 0) return "Expired";

  const minutes = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;
  const days = Math.floor(diff / 86400000);

  let result = "";

  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m`;
  if (result === "") result = "< 1m";

  return result.trim();
}

export function getEffectTitle(effectId, effect) {
  if (!effectId) return null;

  var effectTitle = null;

  if (effectId.startsWith("item")) {
    effectTitle = getItemNameById(parseInt(effectId.replace("item", "")));
  } else {
    switch (effectId) {
      case "randomFishLow":
        effectTitle = "Mermaid's Blessing";
        break;
      case "randomFishHigh":
        effectTitle = "Poseidon's Blessing";
        break;
      case "randomHuntLow":
        effectTitle = "Elvish Spirit";
        break;
      case "randomHuntHigh":
        effectTitle = "Magical Spirit";
        break;
      case "randomExploreLow":
        effectTitle = "Meteor Shower";
        break;
      case "randomExploreHigh":
        effectTitle = "Odd Visitor";
        break;
      case "randomMineLow":
        effectTitle = "Underworld Augury";
        break;
      case "randomMineHigh":
        effectTitle = "Demonic Augury";
        break;
      default:
        return null;
    }
  }

  // Filter out expired effects
  if (effect?.endTime && effect.endTime < Date.now()) {
    return null;
  }

  if (effectTitle) {
    return {
      title: effectTitle,
      endTime: formatEffectEndTime(effect?.endTime),
      multiplier: effect?.modifier?.multiplier,
      action: sanitizeAction(effect?.modifier?.action),
    };
  }
}
