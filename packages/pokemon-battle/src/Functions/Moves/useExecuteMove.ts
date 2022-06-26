import { useDispatch, useSelector } from "react-redux";
import { Move, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import {
  applyDamageToActivePokemon,
  updateActiveUiState,
} from "../../Store/activePokemonSlice";
import { addMultipleLogs, Log } from "../../Store/logSlice";
import {
  applyDamageToOpponentPokemon,
  opponentPokemonSlice,
  updateOpponentUiState,
} from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { useApplyStatChange } from "../Stats/useApplyStatChange";
import { useGameOver } from "../Turn/useGameOver";
import { useCalculateDamage } from "../Damage/useCalculateDamage";
import { accuracyCheck } from "./accuracyCheck";
import { determineUserAndTarget } from "./determineUserAndTarget";

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

  const executeMove = (move: Move, mover: "active" | "opponent") => {
    //collect all relevant logs in the right order, before dispatching to store
    let logs: Log[] = [];
    //damage
    let damage = 0;
    //determine target
    const { user, target } = determineUserAndTarget(
      move,
      mover,
      activePokemon,
      opponentPokemon
    );

    logs.push({
      message: `${user.name} used ${move.name}. `,
    });

    //check for accuracy
    const moveWillHit: boolean =
      accuracyCheck(move, target.stats.evasion, user.stats.accuracy) ||
      target === user;

    //only execute move if accuracy check passes
    if (moveWillHit) {
      // handle normal damaging move
      if (
        ["physical", "special"].includes(move.damage_class) &&
        move.power !== null
      ) {
        const calculatedDamage = calculateDamage(
          user.level,
          move,
          user,
          target
        );
        damage = calculatedDamage.damage;
        const damageLogs = calculatedDamage.logs;
        console.log(user, move, damage);
        //dispatch the damage to the store value
        target === opponentPokemon
          ? dispatch(applyDamageToOpponentPokemon(damage))
          : dispatch(applyDamageToActivePokemon(damage));

        //update the ui after the log is dismissed
        const onDismissal =
          target === opponentPokemon
            ? () => {
                dispatch(updateOpponentUiState());
              }
            : () => {
                dispatch(updateActiveUiState());
              };
        //update the logs
        logs[0].onDismissal = onDismissal;
        logs = logs.concat(damageLogs);
      }

      //handle stat change move
      if (
        (move.statChange && move.statChange.chance >= Math.random()) ||
        move.statChange?.chance === 0
      ) {
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
    } else logs.push({ message: "it missed" });

    dispatch(addMultipleLogs(logs));
  };

  return { executeMove };
};
