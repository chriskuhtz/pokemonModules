import { useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";

export const useDetermineFirstUser = () => {
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const determineFirstMover = (activeMove: Move, opponentMove: Move) => {
    let firstMover: "active" | "opponent" = "active";

    if (
      opponentMove.priority > activeMove.priority ||
      opponentPokemon.stats.speed.initial *
        opponentPokemon.stats.speed.modifier >
        activePokemon.stats.speed.initial * activePokemon.stats.speed.modifier
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
