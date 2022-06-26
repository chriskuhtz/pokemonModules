import { useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import { calculateModifiedStat } from "../Stats/calculateModifiedStat";

export const useDetermineFirstUser = () => {
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const calcSpeed = (pokemon: OpponentPokemon | ActivePokemon): number => {
    const speed = pokemon.stats.speed;

    const modifiedSpeed = calculateModifiedStat(speed);

    const paraFactor = pokemon.statusConditions.paralyzed ? 0.5 : 1;

    const calculatedSpeed = modifiedSpeed * paraFactor;

    return calculatedSpeed;
  };
  const determineFirstMover = (activeMove: Move, opponentMove: Move) => {
    let firstMover: "active" | "opponent" = "active";
    if (
      opponentMove.priority > activeMove.priority ||
      calcSpeed(opponentPokemon) > calcSpeed(activePokemon)
    ) {
      firstMover = "opponent";
    }
    if (opponentMove.priority < activeMove.priority) {
      firstMover = "active";
    }
    return firstMover;
  };

  return { determineFirstMover };
};
