import { useDispatch, useSelector } from "react-redux";
import { Move, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import {
  applyDamageToActivePokemon,
  reduceStatusCounterForActivePokemon,
} from "../../Store/activePokemonSlice";
import { addMultipleLogs, Log } from "../../Store/logSlice";
import {
  applyDamageToOpponentPokemon,
  reduceStatusCounterForOpponentPokemon,
} from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { useApplyStatChange } from "../Stats/useApplyStatChange";
import { useGameOver } from "../Turn/useGameOver";
import { useCalculateDamage } from "../Damage/useCalculateDamage";
import { accuracyCheck } from "./accuracyCheck";
import { determineUserAndTarget } from "./determineUserAndTarget";
import { useApplyStatusConditions } from "../StatusConditions/useApplyStatusConditions";
import { useDetermineTypeFactor } from "../Damage/useDetermineTypeFactor";
import { useCheckForStatusCondition } from "../StatusConditions/useCheckForStatusCondition";
import { StatusConditionEnum } from "../../Models/StatusConditions";

export const useExecuteMove = () => {
  const { gameOver } = useGameOver();
  const { calculateDamage } = useCalculateDamage();
  const { applyStatChange } = useApplyStatChange();
  const { applyStatusConditions } = useApplyStatusConditions();
  const { determineTypeFactor } = useDetermineTypeFactor();
  const { checkForSleep, checkForFreeze, checkForParalysis } =
    useCheckForStatusCondition();

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

    //check for paralysis
    const isPokemonParalyzed = checkForParalysis(mover);
    if (isPokemonParalyzed) return;
    //check for sleep
    const isPokemonAsleep = checkForSleep(mover);
    if (isPokemonAsleep) return;
    //check for freeze
    const isPokemonFrozen = checkForFreeze(mover, move);
    if (isPokemonFrozen) return;
    //log the move
    logs.push({
      message: `${user.name} used ${move.name}. `,
    });

    //check if the move affects the opponent
    if (target !== user) {
      const typeFactor = determineTypeFactor(move.type, target.primaryType);
      const secondaryTypeFactor =
        target.secondaryType && typeFactor !== 0
          ? determineTypeFactor(move.type, target.secondaryType)
          : 1;
      if (typeFactor === 0 || secondaryTypeFactor === 0) {
        logs.push({ message: "It has no effect." });
        dispatch(addMultipleLogs(logs));
        return;
      }
    }

    //check for accuracy
    const moveWillHit: boolean =
      accuracyCheck(move, target.stats.evasion, user.stats.accuracy) ||
      target === user;
    if (!moveWillHit) {
      logs.push({ message: "it missed" });
      dispatch(addMultipleLogs(logs));
      return;
    }
    //check for defrost
    if (
      target.statusConditions.primaryCondition === StatusConditionEnum.FREEZE &&
      move.type === "fire" &&
      move.target === TargetEnum.TARGET
    ) {
      logs.push({
        message: `${target.name} was thawed out. `,
        onDismissal: () =>
          mover === "opponent"
            ? dispatch(
                reduceStatusCounterForActivePokemon(StatusConditionEnum.FREEZE)
              )
            : dispatch(
                reduceStatusCounterForOpponentPokemon(
                  StatusConditionEnum.FREEZE
                )
              ),
      });
    }

    // handle normal damaging move
    if (
      ["physical", "special"].includes(move.damage_class) &&
      move.power !== null
    ) {
      const calculatedDamage = calculateDamage(user.level, move, user, target);
      damage = calculatedDamage.damage;
      const damageLogs = calculatedDamage.logs;
      // console.log(user, move, damage);
      //dispatch the damage to the store value

      //update the ui after the log is dismissed
      const onDismissal = () =>
        target === opponentPokemon
          ? dispatch(applyDamageToOpponentPokemon(damage))
          : dispatch(applyDamageToActivePokemon(damage));
      //update the logs
      logs[0].onDismissal = onDismissal;
      logs = logs.concat(damageLogs);
    }
    //check if one contender fainted
    if (target.hp.current - damage <= 0) {
      const gameIsOver = gameOver();
      logs = logs.concat(gameIsOver.logs);
    }
    //handle statuscondition moves
    if (move.meta.ailment.name !== "none") {
      const statusConditions = applyStatusConditions(move, user, target);
      logs = logs.concat(statusConditions.logs);
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

    dispatch(addMultipleLogs(logs));
  };

  return { executeMove };
};
