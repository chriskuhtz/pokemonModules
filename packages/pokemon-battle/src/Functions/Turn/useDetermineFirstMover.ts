import { useSelector } from "react-redux";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";

export const useDetermineFirstUser = () => {
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  let firstMover: "active" | "opponent" = "active";
  if (
    opponentPokemon.stats.speed.initial * opponentPokemon.stats.speed.modifier >
    activePokemon.stats.speed.initial * activePokemon.stats.speed.modifier
  ) {
    firstMover = "opponent";
  }

  return { firstMover };
};
