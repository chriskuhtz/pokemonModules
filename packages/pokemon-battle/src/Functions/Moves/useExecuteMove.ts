import { useDispatch, useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon, Pokemon } from "../../Models/Pokemon";
import { addLog } from "../../Store/logSlice";
import { applyDamageToOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { useCalculateDamage } from "./useCalculateDamage";

export const useExecuteMove = (
  move: Move,
  user: "active" | "opponent",
  target: "opponent" | "self"
) => {
  const { calculateDamage } = useCalculateDamage();
  const dispatch = useDispatch();
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );
  let actor: Pokemon | undefined;
  let receiver: Pokemon | undefined;
  if (user === "active") {
    actor = activePokemon;
  } else if (user === "opponent") {
    actor = opponentPokemon;
  }
  if (target === "self") {
    receiver = actor;
  } else if (target === "opponent") {
    if (user === "active") {
      receiver = opponentPokemon;
    } else if (user === "opponent") {
      receiver = activePokemon;
    }
  }
  const executeMove = () => {
    const damage = calculateDamage(
      actor?.level ?? -1,
      move,
      actor?.stats.attack.initial ?? -1,
      receiver?.stats.defense.initial ?? -1
    );
    dispatch(applyDamageToOpponentPokemon(damage));
    dispatch(addLog(`${actor?.name} used ${move.name}!`));
  };
  return { executeMove };
};
