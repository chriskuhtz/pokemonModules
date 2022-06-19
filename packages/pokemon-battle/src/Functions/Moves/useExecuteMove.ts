import { useDispatch, useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { applyDamageToActivePokemon } from "../../Store/activePokemonSlice";
import { addLog } from "../../Store/logSlice";
import { applyDamageToOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { useGameOver } from "../Turn/useGameOver";
import { useCalculateDamage } from "./useCalculateDamage";

export const useExecuteMove = () => {
  const { gameOver } = useGameOver();
  const { calculateDamage } = useCalculateDamage();

  const dispatch = useDispatch();

  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const executeMove = (move: Move, user: ActivePokemon | OpponentPokemon) => {
    let target = opponentPokemon;
    if (move.target === "self") {
      target = user;
    } else if (user === opponentPokemon && move.target === "opponent") {
      target = activePokemon;
    } else if (user === activePokemon && move.target === "opponent") {
      target = opponentPokemon;
    } else {
      console.log("no target condition hit, target remains on default");
    }

    // handle normal damaging move
    if (["physical", "special"].includes(move.moveType)) {
      const calculatedDamage = calculateDamage(
        user.level,
        move,
        user.stats.attack.initial,
        target.stats.defense.initial,
        user,
        target
      );

      if (target === opponentPokemon) {
        dispatch(
          addLog({
            message: `${user.name} used ${move.name}. `,
            secondary: `${calculatedDamage.message}`,
            onDismissal: () => {
              dispatch(applyDamageToOpponentPokemon(calculatedDamage.damage));
            },
          })
        );
      }
      if (target === activePokemon) {
        dispatch(
          addLog({
            message: `${user.name} used ${move.name}.`,
            secondary: `${calculatedDamage.message}`,
            onDismissal: () => {
              dispatch(applyDamageToActivePokemon(calculatedDamage.damage));
            },
          })
        );
      }
      if (target.hp.current - calculatedDamage.damage <= 0) {
        gameOver();
        return;
      }
    }
  };

  return { executeMove };
};
