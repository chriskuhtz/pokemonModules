import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";

export const paralysisCheck = (pokemon: OpponentPokemon | ActivePokemon) => {
  if (pokemon.statusConditions.paralyzed && Math.random() > 0.75) {
    return true;
  }
  return false;
};
