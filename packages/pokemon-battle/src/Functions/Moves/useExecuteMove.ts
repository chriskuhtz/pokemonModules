import { useDispatch, useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon, Pokemon } from "../../Models/Pokemon";
import { applyDamageToActivePokemon } from "../../Store/activePokemonSlice";
import { addLog } from "../../Store/logSlice";
import { applyDamageToOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { useCalculateDamage } from "./useCalculateDamage";

export const useExecuteMove = () => {
  const { calculateDamage } = useCalculateDamage();
  const dispatch = useDispatch();
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const executeMove = (move: Move, user: Pokemon, target: Pokemon) => {
    //handle normal physical move
    if (["physical", "special"].includes(move.moveType)) {
      const damage = calculateDamage(
        user.level,
        move,
        user.stats.attack.initial,
        target.stats.defense.initial
      );
      if (target === opponentPokemon) {
        dispatch(applyDamageToOpponentPokemon(damage));
      }
      if (target === activePokemon) {
        dispatch(applyDamageToActivePokemon(damage));
      }
    }
    //trigger Opponent Move
    if (user === activePokemon) {
      dispatch(
        addLog({
          message: `${user.name} used ${move.name}!`,
          onDismissal: () =>
            executeMove(
              opponentPokemon.moves.first,
              opponentPokemon,
              activePokemon
            ),
        })
      );
    } else
      dispatch(
        addLog({
          message: `Opponent ${user.name} used ${move.name}!`,
        })
      );
  };
  return { executeMove };
};
