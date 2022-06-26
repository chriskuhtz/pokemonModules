import { Move } from "../../Models/Move";
import { PokemonMoveSet } from "../../Models/Pokemon";

export const decideOpponentMove = (moves: PokemonMoveSet): Move => {
  const moveArray = Object.values(moves);
  const selectedMove = moveArray[Math.round(moveArray.length * Math.random())];
  console.log(selectedMove.name);
  return selectedMove;
};
