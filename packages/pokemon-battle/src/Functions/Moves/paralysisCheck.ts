import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";

export const paralysisCheck = (pokemon: OpponentPokemon | ActivePokemon) => {
  if (
    pokemon.statusConditions.primaryCondition ===
      StatusConditionEnum.PARALYSIS &&
    Math.random() > 0.75
  ) {
    return true;
  }
  return false;
};
