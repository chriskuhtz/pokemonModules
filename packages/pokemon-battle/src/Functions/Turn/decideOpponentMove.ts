import { Move } from "../../Models/Move";
import { PokemonMoveSet } from "../../Models/Pokemon";

export const decideOpponentMove = (moves: PokemonMoveSet): Move => {
  const moveArray = Object.values(moves);
  const moveIndex = Math.round(moveArray.length * Math.random());
  const selectedMove = moveArray[moveIndex];

  return selectedMove;
};
