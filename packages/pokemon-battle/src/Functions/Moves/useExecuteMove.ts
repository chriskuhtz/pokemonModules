import { useDispatch, useSelector } from "react-redux";
import { Move, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { applyDamageToActivePokemon } from "../../Store/activePokemonSlice";
import { addMultipleLogs, Log } from "../../Store/logSlice";
import { applyDamageToOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { useApplyStatChange } from "../Stats/useApplyStatChange";
import { useGameOver } from "../Turn/useGameOver";
import { useCalculateDamage } from "./useCalculateDamage";

export const useExecuteMove = () => {
  const { gameOver } = useGameOver();
  const { calculateDamage } = useCalculateDamage();
  const { applyStatChange } = useApplyStatChange();

  const dispatch = useDispatch();

  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const executeMove = (move: Move, user: ActivePokemon | OpponentPokemon) => {
    //collect all relevant logs in the right order, before dispatching to store
    let logs: Log[] = [];
    //damage
    let damage = 0;
    //determine target
    let target = opponentPokemon;
    if (move.target === TargetEnum.USER) {
      target = user;
    } else if (user === opponentPokemon && move.target === "opponent") {
      target = activePokemon;
    } else if (user === activePokemon && move.target === "opponent") {
      target = opponentPokemon;
    } else {
      console.log("no target condition hit, target remains on default");
    }

    logs.push({
      message: `${user.name} used ${move.name}. `,
    });

    // handle normal damaging move
    if (["physical", "special"].includes(move.damage_class)) {
      const calculatedDamage = calculateDamage(user.level, move, user, target);
      damage = calculatedDamage.damage;
      const damageLogs = calculatedDamage.logs;

      const onDismissal =
        target === opponentPokemon
          ? () => {
              dispatch(applyDamageToOpponentPokemon(damage));
            }
          : () => {
              dispatch(applyDamageToActivePokemon(damage));
            };

      //if calculateDamage does not return logs, apply the damage on the previous log

      logs[0].onDismissal = onDismissal;

      logs = logs.concat(damageLogs);
    }

    //handle stat change move
    if (move.statChange && move.statChange.chance >= Math.random()) {
      const statChanges = applyStatChange(move, user, target);
      logs = logs.concat(statChanges.logs);
    } else if (move.statChange && move.statChange.chance < Math.random()) {
      console.log("failed chance check");
    }

    //check if one contender fainted
    if (target.hp.current - damage <= 0) {
      const isGameOver = gameOver();
      logs = logs.concat(isGameOver.logs);
    }

    dispatch(addMultipleLogs(logs));
  };

  return { executeMove };
};
