import { EvolutionStage } from "../Models/SinglePokemonModels";

export const determineEvoMethod = (e: EvolutionStage): string => {
  if (
    e.chainLink.evolution_details.length > 0 &&
    e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
      .min_level
  )
    return `At Level ${
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .min_level
    }`;
  else if (
    e.chainLink.evolution_details.length > 0 &&
    e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
      .min_happiness
  ) {
    return `Level Up with Happiness ${
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .min_happiness
    }`;
  } else if (
    e.chainLink.evolution_details.length > 0 &&
    e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1].item
  ) {
    return `Using a ${
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .item?.name
    }`;
  } else if (
    e.chainLink.evolution_details.length > 0 &&
    e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
      .trigger.name === "trade"
  ) {
    return `Trade while holding a ${
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .held_item?.name
    }`;
  } else if (
    e.chainLink.evolution_details.length > 0 &&
    e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
      .held_item
  ) {
    return `Level Up while holding a ${
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .held_item?.name
    }`;
  } else if (
    e.chainLink.evolution_details.length > 0 &&
    e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
      .trigger.name === "trade"
  ) {
    return `Trade Evolution`;
  }
  return "unknown evolution method";
};
