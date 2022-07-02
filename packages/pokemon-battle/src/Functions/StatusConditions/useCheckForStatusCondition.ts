import { useDispatch, useSelector } from "react-redux";
import { Move, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";
import { reduceStatusCounterForActivePokemon } from "../../Store/activePokemonSlice";
import { addLog } from "../../Store/logSlice";
import { reduceStatusCounterForOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";

export const useCheckForStatusCondition = () => {
  const dispatch = useDispatch();
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const checkForSleep = (contender: "active" | "opponent"): boolean => {
    const pokemon = contender === "active" ? activePokemon : opponentPokemon;
    const sleepCounter = pokemon.statusConditions.sleepCounter;
    const reduceCounter = () =>
      contender === "active"
        ? dispatch(
            reduceStatusCounterForActivePokemon(StatusConditionEnum.SLEEP)
          )
        : dispatch(
            reduceStatusCounterForOpponentPokemon(StatusConditionEnum.SLEEP)
          );

    if (!sleepCounter) return false;
    else {
      if (sleepCounter === 1) {
        dispatch(
          addLog({
            message: `${pokemon.name} woke up!`,
            onDismissal: () => reduceCounter(),
          })
        );
        return false;
      } else {
        dispatch(
          addLog({
            message: `${pokemon.name} is fast asleep!`,
            onDismissal: () => reduceCounter(),
          })
        );
        return true;
      }
    }
  };
  const checkForFreeze = (
    contender: "active" | "opponent",
    move: Move
  ): boolean => {
    const pokemon = contender === "active" ? activePokemon : opponentPokemon;
    const willDefrost = Math.random() > 0.8;
    const reduceCounter = () =>
      contender === "active"
        ? dispatch(
            reduceStatusCounterForActivePokemon(StatusConditionEnum.FREEZE)
          )
        : dispatch(
            reduceStatusCounterForOpponentPokemon(StatusConditionEnum.FREEZE)
          );

    if (
      pokemon.statusConditions.primaryCondition !==
        StatusConditionEnum.FREEZE ||
      (move.type === "fire" && move.target === TargetEnum.TARGET)
    )
      return false;
    if (willDefrost) {
      dispatch(
        addLog({
          message: `${pokemon.name} thawed out!`,
          onDismissal: () => reduceCounter(),
        })
      );
      return false;
    } else {
      dispatch(
        addLog({
          message: `${pokemon.name} is frozen solid!`,
        })
      );
      return true;
    }
  };
  const checkForParalysis = (contender: "active" | "opponent") => {
    const pokemon = contender === "active" ? activePokemon : opponentPokemon;
    if (
      pokemon.statusConditions.primaryCondition ===
        StatusConditionEnum.PARALYSIS &&
      Math.random() > 0.75
    ) {
      dispatch(
        addLog({
          message: `${pokemon.name} is fully paralyzed!`,
        })
      );
      return true;
    }

    return false;
  };

  return { checkForSleep, checkForFreeze, checkForParalysis };
};
