import { Move, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon, Pokemon } from "../../Models/Pokemon";

export const determineUserAndTarget = (
  move: Move,
  mover: "active" | "opponent",
  activePokemon: Pokemon,
  opponentPokemon: Pokemon
) => {
  let target = opponentPokemon;
  let user = activePokemon;

  if (move.target === TargetEnum.SELF) {
    if (mover === "active") {
      target = opponentPokemon;
      user = activePokemon;
    } else if (mover === "opponent") {
      target = opponentPokemon;
      user = opponentPokemon;
    }
  } else if (move.target === TargetEnum.TARGET) {
    if (mover === "active") {
      target = opponentPokemon;
      user = activePokemon;
    } else if (mover === "opponent") {
      target = activePokemon;
      user = opponentPokemon;
    }
  } else {
    console.error("no target condition hit, target remains on default");
  }

  return { user, target };
};
